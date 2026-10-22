import { describe, expect, it } from 'vitest';
import P from '../src/data/params-2026.json';
import D from '../src/data/bonds.json';
import { creditPremium, notaryPremium, titlePremium, titleBondAmount, contractPremium, erisaBond, bidGuarantee, millerAct, termFactor, median, type PremiumModel } from '../src/lib/engine/bond';
import { getTool, TOOL_KINDS, KINDS } from '../src/lib/tool-specs';

const M = P.premium as unknown as PremiumModel;
const F = (D as unknown as { federal: Record<string, Record<string, number>> }).federal;

describe('premium engine', () => {
  it('credit premium: rate x amount, minimum applied', () => {
    const p = creditPremium(M, 'license', 't1', 30000);
    expect(p.perYear.lo).toBeCloseTo(225); // 0.75 % of 30,000
    expect(p.perYear.hi).toBeCloseTo(450);
    expect(creditPremium(M, 'license', 't1', 5000).perYear.lo).toBe(100); // $100 minimum
  });
  it('multi-year factor', () => { expect(termFactor(M, 1)).toBe(1); expect(termFactor(M, 3)).toBe(2); });
  it('notary flat price', () => { const n = notaryPremium(M, 10000); expect(n.lo).toBe(30); expect(n.hi).toBe(100); });
  it('title bond schedule (agency example: $10,000 bond = $160)', () => { expect(titlePremium(M, 10000)).toBe(160); expect(titlePremium(M, 5000)).toBe(100); expect(titleBondAmount(12000, 1.5)).toBe(18000); });
  it('contract scale (published example: $500,000 = $8,500)', () => { expect(contractPremium(M, 500000).premium).toBe(8500); expect(contractPremium(M, 100000).premium).toBe(2500); });
  it('ERISA 10 %, minimum and cap', () => {
    const f = F.erisa as unknown as { pct: number; min: number; max: number; max_employer_securities: number };
    expect(erisaBond(2000000, f).amount).toBe(200000);
    expect(erisaBond(20000000, f)).toEqual({ amount: 500000, rule: 'max' });
    expect(erisaBond(20000000, f, true).amount).toBe(1000000);
    expect(erisaBond(5000, f)).toEqual({ amount: 1000, rule: 'min' });
  });
  it('bid guarantee and Miller Act', () => {
    expect(bidGuarantee(1000000, F['bid-guarantee'] as unknown as { pct: number; cap: number })).toBe(200000);
    expect(bidGuarantee(1e9, F['bid-guarantee'] as unknown as { pct: number; cap: number })).toBe(3000000);
    const m = F['miller-act'] as unknown as { threshold: number; alt_from: number };
    expect(millerAct(200000, m)).toBe('bonds'); expect(millerAct(100000, m)).toBe('alternatives'); expect(millerAct(20000, m)).toBe('none');
  });
  it('median', () => { expect(median([1, 3, 2])).toBe(2); expect(median([1, 2, 3, 4])).toBe(2.5); });
});

describe('calculators', () => {
  it('every kind of the main calculator returns a figure', () => {
    for (const k of KINDS) {
      const spec = getTool('bond', { bt: k.value });
      const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def]));
      const o = spec.run(v);
      expect(o.value, k.value).toBeTruthy();
      expect(o.value, k.value).not.toMatch(/NaN|undefined/);
    }
  });
  it('every spec runs with its defaults', () => {
    for (const kind of TOOL_KINDS) { const s = getTool(kind); const o = s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def]))); expect(o.value).not.toMatch(/NaN|undefined/); }
  });
  it('Texas dealer bond: $50,000, good credit $375 to $750', () => {
    const s = getTool('bond', { bt: 'auto-dealer', st: 'texas' });
    const o = s.run({ ...Object.fromEntries(s.inputs.map((i) => [i.id, i.def])), cr: 't1' });
    expect(o.value).toMatch(/375.*750/);
  });
});
