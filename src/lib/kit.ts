/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand.
 *   K.P                  params-2026.json (premium model, sources)
 *   K.M                  the premium model (tiers, classes, minimum, notary, title, contract scale)
 *   K.T(type)            a bond type: label, short, states
 *   K.R(type, state)     a verified state record: amount, variants, range, multiplier, term, statute, note, quote, url, read
 *   K.amt(type, state)   main required amount (fixed amount, else first variant, else low end of the range)
 *   K.states(type)       verified states of a type (records, alphabetical); K.has(type, state)
 *   K.F(id)              a federal rule (freight-broker, erisa, miller-act, bid-guarantee, dmepos)
 *   K.credit(cls, tier, amount, years?)  credit-rated premium {lo, hi, perYear, rate}
 *   K.notary(amount)     flat notary premium {lo, hi}; K.title(amount) title bond premium
 *   K.contract(price)    sliding-scale contract premium {premium, layers}; K.erisa(assets, employerSecurities?)
 *   K.bid(bid)           federal bid guarantee; K.miller(price) 'bonds' | 'alternatives' | 'none'
 *   K.tool(kind, args)   run a calculator of tool-specs.ts and get its output
 *   formats              K.usd(1234.5) "$1,235", K.cents(36.75) "$36.75", K.num, K.dec, K.pct(0.1) "10.0 %", K.rate(1.5) "1.5 %", K.day("2026-09-01") "September 1, 2026"
 */
import P from '../data/params-2026.json';
import { TYPES, btype, statesOf, recOf, hasRec, fed, mainAmount, ALL_STATES, stateName, RETRIEVED } from './data';
import { usd, pct, getTool, longDate, M } from './tool-specs';
import { formatNumber, formatDecimal, formatMoney } from './format';
import { creditPremium, notaryPremium, titlePremium, contractPremium, erisaBond, bidGuarantee, millerAct, median, type RateClass, type Tier } from './engine/bond';
import type { V } from './tool-types';

function tool(kind: string, args: V = {}) {
  const spec = getTool(kind, args);
  const v: V = { ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...args };
  return spec.run(v);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const F = (id: string) => fed(id) as unknown as Record<string, any>;

export const KIT = {
  P, M, TYPES, T: btype, R: recOf, states: statesOf, has: hasRec, amt: (t: string, st: string) => mainAmount(recOf(t, st)), ALL_STATES, stateName, RETRIEVED, F,
  credit: (cls: RateClass, tier: Tier, amount: number, years = 1) => creditPremium(M, cls, tier, amount, years),
  notary: (amount: number) => notaryPremium(M, amount),
  title: (amount: number) => titlePremium(M, amount),
  contract: (price: number) => contractPremium(M, price),
  erisa: (assets: number, es = false) => erisaBond(assets, F('erisa') as unknown as { pct: number; min: number; max: number; max_employer_securities: number }, es),
  bid: (b: number) => bidGuarantee(b, F('bid-guarantee') as unknown as { pct: number; cap: number }),
  miller: (price: number) => millerAct(price, F('miller-act') as unknown as { threshold: number; alt_from: number }),
  median, tool,
  usd, pct, rate: (x: number) => `${formatDecimal(x, 2)} %`, cents: (x: number) => formatMoney(x, Number.isInteger(x) ? 0 : 2), num: (x: number) => formatNumber(x, 0), dec: (x: number, d = 1) => formatDecimal(x, d), day: longDate,
};
export type Kit = typeof KIT;
