/**
 * Surety bond engine: pure functions, no DOM, no network. Two halves that never mix:
 *  - the REQUIRED amount, read on official pages (src/data/bonds.json, built from data/facts);
 *  - the PREMIUM, an estimate from published rate grids (params-2026.json > premium), always a range.
 * Rates are percentages of the bond amount per year (1.5 means 1.5 %).
 */
export type Tier = 't1' | 't2' | 't3' | 't4' | 't5';
export type RateClass = 'license' | 'dealer' | 'freight' | 'court' | 'fidelity';
export interface Range { lo: number; hi: number }
export interface PremiumModel {
  classes: Record<string, { rates: Record<string, [number, number]> }>;
  minimum: number;
  multiYear: Record<string, number>;
  notary: { floorLow: number; floorHigh: number; rateLow: number; rateHigh: number };
  title: { base: number; baseUpTo: number; perThousand: number };
  contract: { scale: Array<[number | null, number]>; creditProgramRate: number; creditProgramMax: number };
}

/** Price of a term of `years` relative to one year: 1, then the published multi-year factors, then +0.5 a year. */
export function termFactor(m: PremiumModel, years: number): number {
  const y = Math.max(1, Math.round(years));
  if (y === 1) return 1;
  if (m.multiYear[String(y)] !== undefined) return m.multiYear[String(y)];
  const known = Object.keys(m.multiYear).map(Number).sort((a, b) => b - a)[0] ?? 1;
  return (m.multiYear[String(known)] ?? 1) + 0.5 * (y - known);
}

export interface Premium extends Range { rate: [number, number]; minApplied: boolean; years: number; perYear: Range }
/** Credit-rated premium for a bond of `amount`, over `years`, with the market minimum applied to each end. */
export function creditPremium(m: PremiumModel, cls: RateClass, tier: Tier, amount: number, years = 1): Premium {
  const rate = m.classes[cls].rates[tier];
  const f = termFactor(m, years);
  const raw = { lo: (amount * rate[0]) / 100, hi: (amount * rate[1]) / 100 };
  const perYear = { lo: Math.max(m.minimum, raw.lo), hi: Math.max(m.minimum, raw.hi) };
  return { lo: Math.max(m.minimum, raw.lo * f), hi: Math.max(m.minimum, raw.hi * f), rate, minApplied: raw.lo * f < m.minimum, years, perYear };
}

/** Notary bonds are sold for the whole commission at a flat price, not rated on credit. */
export function notaryPremium(m: PremiumModel, amount: number): Range {
  const n = m.notary;
  return { lo: Math.max(n.floorLow, (amount * n.rateLow) / 100), hi: Math.max(n.floorHigh, (amount * n.rateHigh) / 100) };
}

/** Title bond premium on the published schedule: a base up to a bond amount, then a price per extra $1,000. */
export function titlePremium(m: PremiumModel, amount: number): number {
  const t = m.title;
  if (amount <= t.baseUpTo) return t.base;
  return t.base + t.perThousand * Math.ceil((amount - t.baseUpTo) / 1000);
}

/** Bond amount for a bonded title: the state's multiple of the vehicle value. */
export const titleBondAmount = (value: number, multiplier: number) => Math.round(value * multiplier);

/** Contract bond premium on a sliding scale per $1,000 of contract price (layers of [width, $ per 1,000]). */
export function contractPremium(m: PremiumModel, price: number): { premium: number; layers: Array<{ from: number; to: number; rate: number; cost: number }> } {
  let left = Math.max(0, price), from = 0, premium = 0;
  const layers: Array<{ from: number; to: number; rate: number; cost: number }> = [];
  for (const [width, rate] of m.contract.scale) {
    if (left <= 0) break;
    const w = width === null ? left : Math.min(width, left);
    const cost = (w / 1000) * rate;
    layers.push({ from, to: from + w, rate, cost });
    premium += cost; left -= w; from += w;
  }
  return { premium, layers };
}

/** ERISA section 412: 10 % of the funds handled, at least the minimum, at most the cap (higher with employer securities). */
export function erisaBond(assets: number, f: { pct: number; min: number; max: number; max_employer_securities: number }, employerSecurities = false): { amount: number; rule: 'min' | 'pct' | 'max' } {
  const cap = employerSecurities ? f.max_employer_securities : f.max;
  const x = assets * f.pct;
  if (x <= f.min) return { amount: f.min, rule: 'min' };
  if (x >= cap) return { amount: cap, rule: 'max' };
  return { amount: Math.round(x), rule: 'pct' };
}

/** FAR 28.101-2: bid guarantee of at least 20 % of the bid, capped. */
export const bidGuarantee = (bid: number, f: { pct: number; cap: number }) => Math.min(Math.max(0, bid) * f.pct, f.cap);

/** Miller Act (FAR 28.102-1): bonds required above the threshold; payment protections between alt_from and it. */
export function millerAct(price: number, f: { threshold: number; alt_from: number }): 'bonds' | 'alternatives' | 'none' {
  if (price > f.threshold) return 'bonds';
  if (price > f.alt_from) return 'alternatives';
  return 'none';
}

export const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b), k = Math.floor(s.length / 2);
  return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2;
};
