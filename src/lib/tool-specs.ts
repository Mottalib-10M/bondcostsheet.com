/**
 * The calculators of the site, rendered by components/calc/SpecTool.tsx (full tool) and MiniSim.tsx (mini-simulator).
 * Required amounts come from src/data/bonds.json (official pages); premiums from params-2026.json > premium
 * (published rate grids, shown as ranges and called estimates). This file ships to the browser.
 */
import RAW from '../data/bonds.json';
import P from '../data/params-2026.json';
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import { formatMoney, formatPercent, formatNumber, formatDecimal } from './format';
import { creditPremium, notaryPremium, titlePremium, titleBondAmount, contractPremium, erisaBond, bidGuarantee, millerAct, median, type PremiumModel, type RateClass, type Tier } from './engine/bond';
import type { BondType, Rec, Fed } from './data';

export const usd = (x: number) => `${x < -0.5 ? '-' : ''}${formatMoney(Math.abs(Math.round(x)), 0)}`;
export const pct = (x: number, d = 1) => formatPercent(x, d);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;

const D = RAW as unknown as { types: BondType[]; federal: Record<string, Fed & Record<string, number>> };
export const M = P.premium as unknown as PremiumModel & { tiers: Array<{ id: Tier; label: string }>; classes: Record<string, { label: string; rates: Record<string, [number, number]> }> };
const F = D.federal;
const TY = (id: string) => D.types.find((t) => t.id === id)!;
const recs = (id: string) => TY(id)?.states ?? [];
/** "1.5 %" style rate from a percentage number. */
const rate = (x: number) => `${formatDecimal(x, 2)}\u00a0%`;
const range = (lo: number, hi: number) => (Math.round(lo) === Math.round(hi) ? usd(lo) : `${usd(lo)} to ${usd(hi)}`);
const yrs = (x: number) => `${formatNumber(x, 0)} year${x === 1 ? '' : 's'}`;

/** Bond kinds of the main calculator. */
export const KINDS: Array<{ value: string; label: string; scope: 'state' | 'federal' | 'amount' }> = [
  { value: 'notary', label: 'Notary public bond', scope: 'state' },
  { value: 'contractor', label: 'Contractor license bond', scope: 'state' },
  { value: 'auto-dealer', label: 'Auto dealer bond', scope: 'state' },
  { value: 'title', label: 'Title bond (bonded title)', scope: 'state' },
  { value: 'freight', label: 'Freight broker bond (BMC-84)', scope: 'federal' },
  { value: 'erisa', label: 'ERISA fidelity bond', scope: 'federal' },
  { value: 'performance', label: 'Performance and payment bond', scope: 'federal' },
  { value: 'bid', label: 'Bid bond (federal bid guarantee)', scope: 'federal' },
  { value: 'license', label: 'Other license and permit bond', scope: 'amount' },
  { value: 'probate', label: 'Probate or court bond', scope: 'amount' },
];
const scopeOf = (k: string) => KINDS.find((x) => x.value === k)?.scope ?? 'amount';
const PREFERRED = ['texas', 'california', 'florida', 'new-york', 'pennsylvania', 'illinois'];
export const defaultState = (tid: string) => PREFERRED.find((x) => recs(tid).some((r) => r.slug === x)) ?? recs(tid)[0]?.slug ?? '';
const stateOpts = (k: string) => scopeOf(k) === 'state' ? recs(k).map((r) => ({ value: r.slug, label: r.name })) : scopeOf(k) === 'federal' ? [{ value: 'us', label: 'Federal rule, every state' }] : [{ value: 'any', label: 'Any state: enter the amount' }];
const REC = (k: string, slug: string): Rec | undefined => recs(k).find((r) => r.slug === slug) ?? recs(k).find((r) => r.slug === defaultState(k));
const variantOpts = (k: string, slug: string) => { const r = REC(k, slug); return r && r.variants.length ? r.variants.map((x, i) => ({ value: String(i), label: `${x.label}: ${usd(x.amount)}` })) : [{ value: '0', label: 'One amount for every license' }]; };
export const TIER_OPTS = M.tiers.map((t) => ({ value: t.id, label: t.label }));
const tierLabel = (t: string) => M.tiers.find((x) => x.id === t)?.label ?? t;

/** Required amount of a state record for the chosen variant (or the amount the reader enters when the board sets it). */
function stateAmount(r: Rec, vi: number, entered: number) {
  if (r.range) return { amount: Math.min(Math.max(entered, r.range[0]), r.range[1]), how: `set by the Board between ${usd(r.range[0])} and ${usd(r.range[1])}` };
  if (r.variants.length) { const x = r.variants[Math.min(vi, r.variants.length - 1)]; return { amount: x.amount, how: x.label }; }
  return { amount: r.amount ?? 0, how: r.statute ?? 'state rule' };
}

function creditRows(cls: RateClass, tier: Tier, amount: number, years: number): { pr: ReturnType<typeof creditPremium>; rows: ToolOut['rows'] } {
  const pr = creditPremium(M, cls, tier, amount, years);
  const rows: ToolOut['rows'] = [
    [`Rate for credit ${tierLabel(tier).toLowerCase()}`, `${rate(pr.rate[0])} to ${rate(pr.rate[1])} a year`],
    [years > 1 ? `Term of ${yrs(years)}` : 'Term', years > 1 ? `${range(pr.lo, pr.hi)} in one payment` : '1 year, renewed yearly'],
  ];
  if (pr.minApplied) rows.push(['Minimum premium', `${usd(M.minimum)}: most markets charge at least this`]);
  return { pr, rows };
}

function bondOut(v: V): ToolOut {
  const k = s(v, 'bt'), tier = (s(v, 'cr') || 't1') as Tier, years = Math.max(1, Math.min(3, Math.round(n(v, 'yr') || 1)));
  if (k === 'notary') {
    const r = REC('notary', s(v, 'st'))!;
    if (!r.required || !r.amount) return { label: `Notary bond in ${r.name}`, value: 'Not required', sub: r.note, rows: [['Rule', r.statute ?? 'state law']], note: `Read on the official page, ${longDate(r.read)}.` };
    const est = r.official ? { lo: r.official.low, hi: r.official.high } : notaryPremium(M, r.amount);
    return {
      label: `Notary bond premium in ${r.name}`,
      value: range(est.lo, est.hi),
      sub: `once, for the whole ${r.term ? `${r.term}-year ` : ''}commission`,
      rows: [['Bond the law requires', usd(r.amount), r.amount], ['Rule', r.statute ?? 'state law'], ['How it is priced', 'flat, not rated on credit'], ...(r.previous ? [[`Before ${r.changed ? longDate(r.changed) : 'the change'}`, usd(r.previous)] as [string, string]] : [])],
      note: r.official ? `Price range published by the state (${new URL(r.official.url).hostname}). Amount read on the official page, ${longDate(r.read)}.` : `Estimate: flat prices published for $5,000 to $10,000 bonds run from about $20 to $100 for a whole commission; scaled to this bond. Amount read on the official page, ${longDate(r.read)}.`,
    };
  }
  if (k === 'title') {
    const r = REC('title', s(v, 'st'))!, value = n(v, 'vv'), mult = r.multiplier ?? 1;
    const amount = titleBondAmount(value, mult), prem = titlePremium(M, amount);
    const under = r.threshold && value < r.threshold;
    return {
      label: `Title bond in ${r.name}`,
      value: usd(prem),
      sub: `estimated premium, paid once, for a ${usd(amount)} bond`,
      rows: [['Bond amount', `${usd(amount)} (${mult === 1 ? 'the vehicle value' : `${formatNumber(mult, 1)} × the value`})`, amount], ['Vehicle value used', r.valueBasis ?? 'state valuation'], ['Rule', r.statute ?? 'state rule'], ...(under ? [['Below the bond threshold', `${r.name} asks for a bond from ${usd(r.threshold!)} of value`] as [string, string]] : [])],
      note: `Premium on one published schedule: ${usd(M.title.base)} up to a ${usd(M.title.baseUpTo)} bond, then ${usd(M.title.perThousand)} per extra $1,000. Rule read on the DMV page, ${longDate(r.read)}.`,
    };
  }
  if (k === 'auto-dealer' || k === 'contractor') {
    const r = REC(k, s(v, 'st'))!;
    const { amount, how } = stateAmount(r, n(v, 'vr'), n(v, 'ba'));
    const cls: RateClass = k === 'auto-dealer' ? 'dealer' : 'license';
    if (!amount) return { label: `${TY(k).short} bond in ${r.name}`, value: 'Not required', sub: how, rows: [['Rule', r.statute ?? 'state rule']], note: r.note };
    const { pr, rows } = creditRows(cls, tier, amount, years);
    return {
      label: `${TY(k).short} bond premium in ${r.name}`,
      value: range(pr.perYear.lo, pr.perYear.hi),
      sub: `estimated, per year, for a ${usd(amount)} bond`,
      rows: [['Bond the state requires', usd(amount), amount], ['Which amount', how], ...rows],
      note: `Estimate from published rate grids, not a quote. ${r.statute ? `${r.statute}. ` : ''}Amount read on the official page, ${longDate(r.read)}.`,
    };
  }
  if (k === 'freight') {
    const amount = Number(F['freight-broker'].amount);
    const { pr, rows } = creditRows('freight', tier, amount, years);
    return { label: 'Freight broker bond premium', value: range(pr.perYear.lo, pr.perYear.hi), sub: `estimated, per year, for the ${usd(amount)} BMC-84 bond`, rows: [['Bond FMCSA requires', usd(amount), amount], ['Rule', String(F['freight-broker'].statute)], ...rows], note: 'Estimate from a published freight broker rate grid, not a quote. Amount read on eCFR.' };
  }
  if (k === 'erisa') {
    const e = erisaBond(n(v, 'pa'), F.erisa as unknown as { pct: number; min: number; max: number; max_employer_securities: number }, s(v, 'es') === 'yes');
    const { pr, rows } = creditRows('fidelity', tier, e.amount, years);
    const why = e.rule === 'min' ? 'the $1,000 minimum' : e.rule === 'max' ? 'the cap' : '10 % of the funds handled';
    return { label: 'ERISA bond for this plan', value: usd(e.amount), sub: `required coverage (${why}); premium about ${range(pr.perYear.lo, pr.perYear.hi)} a year`, rows: [['Required coverage', usd(e.amount), e.amount], ['Estimated premium', `${range(pr.perYear.lo, pr.perYear.hi)} a year`], ...rows.slice(0, 1)], note: 'Coverage per ERISA § 412 and DOL Field Assistance Bulletin 2008-04; premium is an estimate from published fidelity bond grids.' };
  }
  if (k === 'performance' || k === 'bid') {
    const price = n(v, 'cp'), m = millerAct(price, F['miller-act'] as unknown as { threshold: number; alt_from: number });
    const c = contractPremium(M, price);
    const fed = m === 'bonds' ? 'performance and payment bonds of 100 % each' : m === 'alternatives' ? 'two payment protections, not necessarily bonds' : 'no bond under the Miller Act';
    const credit = tier === 't1' || tier === 't2' ? 'scale' : tier === 't3' && price <= M.contract.creditProgramMax ? 'program' : 'none';
    const prem = credit === 'scale' ? c.premium : credit === 'program' ? (price * M.contract.creditProgramRate) / 100 : 0;
    const premText = credit === 'none' ? 'no standard estimate' : usd(prem);
    if (k === 'bid') {
      const g = bidGuarantee(price, F['bid-guarantee'] as unknown as { pct: number; cap: number });
      return { label: 'Federal bid guarantee', value: usd(g), sub: `at least 20 % of a ${usd(price)} bid, capped at $3 million`, rows: [['Bid guarantee (FAR 28.101-2)', usd(g), g], ['If you win: bonds required', fed], ['Estimated final bond premium', premText]], note: 'State and city owners set their own bid security, often a smaller share: read the invitation for bids. Premium estimate on a standard contract scale.' };
    }
    return {
      label: 'Performance and payment bond premium', value: premText,
      sub: credit === 'scale' ? `estimated, standard scale, for a ${usd(price)} contract` : credit === 'program' ? 'estimated, credit-based program for jobs up to $500,000' : 'most standard markets decline under 600 without financial statements',
      rows: [['Federal requirement', fed], ['Each bond, if required', m === 'bonds' ? usd(price) : 'n/a', m === 'bonds' ? price : 0], ['Effective rate', credit === 'none' ? 'n/a' : rate((prem / Math.max(1, price)) * 100)], ['Payment bond', 'usually priced together with the performance bond']],
      table: credit === 'scale' ? { caption: 'Standard sliding scale, by layer of contract price', headers: ['Layer', '$ per $1,000', 'Premium'], rows: c.layers.map((l) => [`${usd(l.from)} to ${usd(l.to)}`, formatNumber(l.rate, Number.isInteger(l.rate) ? 0 : 2), usd(l.cost)]), align: ['l', 'r', 'r'] } : undefined,
      note: 'Estimate from a published standard contract scale; sureties apply preferred or surcharged rates after reviewing your financial statements.',
    };
  }
  const amount = n(v, 'ba');
  const cls: RateClass = k === 'probate' ? 'court' : 'license';
  const { pr, rows } = creditRows(cls, tier, amount, years);
  return { label: k === 'probate' ? 'Probate bond premium' : 'License bond premium', value: range(pr.perYear.lo, pr.perYear.hi), sub: `estimated, per year, for a ${usd(amount)} bond`, rows: [['Bond amount you entered', usd(amount), amount], ...rows], note: 'Estimate from published rate grids, not a quote.' };
}

const BT = (def: string): Input => ({ kind: 'select', id: 'bt', label: 'Bond', def, options: KINDS.map((x) => ({ value: x.value, label: x.label })) });
const ST = (k: string, def?: string): Input => ({ kind: 'select', id: 'st', label: 'State', def: def && stateOpts(k).some((o) => o.value === def) ? def : stateOpts(k)[0].value, options: stateOpts(k), dyn: (v) => stateOpts(s(v, 'bt') || k), help: 'States whose rule we read on an official page' });
const VR = (k: string, st: string): Input => ({ kind: 'select', id: 'vr', label: 'License class', def: '0', options: variantOpts(k, st), dyn: (v) => variantOpts(s(v, 'bt') || k, s(v, 'st')), show: (v) => { const b = s(v, 'bt'); const r = (b === 'auto-dealer' || b === 'contractor') ? REC(b, s(v, 'st')) : undefined; return !!r && r.variants.length > 0 && !r.range; }, wide: true });
const CR = (def = 't1'): Input => ({ kind: 'select', id: 'cr', label: 'Personal credit score', def, options: TIER_OPTS, show: (v) => !['notary', 'title'].includes(s(v, 'bt')), help: 'The owner’s score; sureties price most bonds on it' });
const VV = (def = 12000): Input => ({ id: 'vv', label: 'Vehicle value', def, unit: '$', max: 5000000, show: (v) => s(v, 'bt') === 'title', help: 'The value your DMV uses' });
const PA = (def = 2000000): Input => ({ id: 'pa', label: 'Plan assets handled', def, unit: '$', max: 50000000, show: (v) => s(v, 'bt') === 'erisa', help: 'Funds the person handles in a year' });
const ES: Input = { kind: 'choice', id: 'es', label: 'Plan holds employer stock', def: 'no', options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }], show: (v) => s(v, 'bt') === 'erisa' };
const CP = (def = 500000): Input => ({ id: 'cp', label: 'Contract price', def, unit: '$', max: 50000000, show: (v) => ['performance', 'bid'].includes(s(v, 'bt')), dynLabel: (v) => (s(v, 'bt') === 'bid' ? 'Bid price' : 'Contract price') });
const BA = (def = 25000): Input => ({ id: 'ba', label: 'Bond amount required', def, unit: '$', max: 10000000, show: (v) => ['license', 'probate'].includes(s(v, 'bt')) || (s(v, 'bt') === 'contractor' && !!REC('contractor', s(v, 'st'))?.range), dynLabel: (v) => (s(v, 'bt') === 'probate' ? 'Bond amount set by the court' : s(v, 'bt') === 'contractor' ? 'Bond amount set by the Board' : 'Bond amount required') });
const YR = (def = 1): Input => ({ id: 'yr', label: 'Term paid at once', def, unit: 'yr', max: 3, adv: true, show: (v) => !['notary', 'title', 'performance', 'bid'].includes(s(v, 'bt')), help: '1 to 3 years; longer terms cost less a year' });

/** Every state of a type, with its amount and premium for a credit tier. */
function compareOut(k: string, tier: Tier): ToolOut {
  const t = TY(k), rs = recs(k);
  const req = rs.filter((r) => r.required && (r.amount || r.variants.length || r.range || r.multiplier));
  const amts = req.filter((r) => r.amount || r.variants.length).map((r) => r.amount ?? r.variants[0].amount);
  const premOf = (a: number) => (k === 'notary' ? notaryPremium(M, a) : creditPremium(M, k === 'auto-dealer' ? 'dealer' : 'license', tier, a, 1).perYear);
  const rows = rs.map((r) => {
    const a = r.amount ?? r.variants[0]?.amount ?? null;
    const p = r.official && k === 'notary' ? { lo: r.official.low, hi: r.official.high } : a ? premOf(a) : null;
    const amtText = !r.required && !r.variants.length ? 'not required' : r.range ? `${usd(r.range[0])} to ${usd(r.range[1])}` : r.variants.length > 1 ? `${usd(Math.min(...r.variants.map((x) => x.amount).filter((x) => x > 0)))} to ${usd(Math.max(...r.variants.map((x) => x.amount)))}` : a ? usd(a) : `${formatNumber(r.multiplier ?? 1, 1)} × value`;
    return [r.name, amtText, p ? range(p.lo, p.hi) : 'n/a', r.statute ?? ''];
  });
  const med = median(amts);
  return {
    label: `${t.label}: median required amount`,
    value: usd(med),
    sub: `across the ${req.length} states verified with a required amount`,
    rows: [['States verified', formatNumber(rs.length, 0)], ['Lowest', usd(Math.min(...amts))], ['Highest', usd(Math.max(...amts))], ['Premium basis', k === 'notary' ? 'flat, whole commission' : `credit ${tierLabel(tier).toLowerCase()}, per year`]],
    table: { caption: `${t.label} by state: amount read on the official page and estimated premium`, headers: ['State', 'Bond required', k === 'notary' ? 'Premium, whole term' : 'Premium a year', 'Rule'], rows, align: ['l', 'r', 'r', 'l'] },
  };
}

/** One amount across the five credit tiers. */
function creditOut(cls: RateClass, amount: number, tier: Tier): ToolOut {
  const mine = creditPremium(M, cls, tier, amount, 1);
  return {
    label: `Premium for a ${usd(amount)} bond, credit ${tierLabel(tier).toLowerCase()}`,
    value: range(mine.perYear.lo, mine.perYear.hi),
    sub: 'estimated, per year',
    rows: [['Rate range', `${rate(mine.rate[0])} to ${rate(mine.rate[1])}`], ['Best tier (700 or higher)', range(creditPremium(M, cls, 't1', amount).perYear.lo, creditPremium(M, cls, 't1', amount).perYear.hi)], ['Lowest tier (under 550)', range(creditPremium(M, cls, 't5', amount).perYear.lo, creditPremium(M, cls, 't5', amount).perYear.hi)]],
    table: { caption: `${M.classes[cls].label}: estimated premium a year by credit score`, headers: ['Credit score', 'Rate', 'Premium a year'], rows: M.tiers.map((t) => { const p = creditPremium(M, cls, t.id, amount); return [t.label, `${rate(p.rate[0])} to ${rate(p.rate[1])}`, range(p.perYear.lo, p.perYear.hi)]; }), align: ['l', 'r', 'r'] },
    note: `Envelope of published agency grids; ${usd(M.minimum)} minimum premium applied.`,
  };
}
const CLASS_OPTS = Object.entries(M.classes).map(([value, c]) => ({ value, label: c.label }));

export const SPECS: Record<string, (arg?: Record<string, number | string>) => ToolSpec> = {
  /** Bond type x state x credit: required amount and estimated premium. */
  bond: (arg = {}) => {
    const k = String(arg.bt ?? 'notary');
    const lock = !!arg.lock;
    const st = String(arg.st ?? defaultState(k));
    const inputs: Input[] = [...(lock ? [] : [BT(k)]), ST(k, st), VR(k, st), VV(Number(arg.vv ?? 12000)), PA(Number(arg.pa ?? 2000000)), ES, CP(Number(arg.cp ?? 500000)), BA(Number(arg.ba ?? 25000)), CR(String(arg.cr ?? 't1')), YR(Number(arg.yr ?? 1))];
    return { inputs, run: (v) => bondOut(lock ? { ...v, bt: k } : v) };
  },
  /** One bond type in every verified state. */
  compare: (arg = {}) => {
    const k = String(arg.bt ?? 'notary');
    const opts = D.types.filter((t) => t.id !== 'title').map((t) => ({ value: t.id, label: t.label }));
    const inputs: Input[] = [...(arg.lock ? [] : [{ kind: 'select', id: 'ct', label: 'Bond', def: k, options: opts } as Input]), { ...CR(String(arg.cr ?? 't1')), show: (v: V) => (arg.lock ? k : s(v, 'ct')) !== 'notary' }];
    return { inputs, run: (v) => compareOut(arg.lock ? k : s(v, 'ct') || k, (s(v, 'cr') || 't1') as Tier) };
  },
  /** One bond amount across the credit tiers. */
  credit: (arg = {}) => ({
    inputs: [{ kind: 'select', id: 'cl', label: 'Kind of bond', def: String(arg.cl ?? 'license'), options: CLASS_OPTS, wide: true }, { id: 'am', label: 'Bond amount', def: Number(arg.am ?? 25000), unit: '$', max: 10000000 }, CR(String(arg.cr ?? 't2'))],
    run: (v) => creditOut((s(v, 'cl') || 'license') as RateClass, n(v, 'am'), (s(v, 'cr') || 't2') as Tier),
  }),
};

export function getTool(kind: string, arg?: Record<string, number | string>): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  return f(arg);
}
export const TOOL_KINDS = Object.keys(SPECS);
