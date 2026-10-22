import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const F = K.F('erisa');
const ex = [50000, 500000, 2000000, 8000000].map((a) => ({ a, b: K.erisa(a) }));
const two = K.erisa(2000000), twoP = K.credit('fidelity', 't1', two.amount);
const cap = K.credit('fidelity', 't1', F.max);

export default defineGuide({
  id: 'erisa-bond', group: 'contract', order: 9, slug: 'erisa-bond',
  nav: 'ERISA fidelity bond', card: 'ERISA section 412: 10 percent of plan funds handled, $1,000 minimum, $500,000 cap; amount and premium for your plan.',
  title: 'ERISA Bond 2026: Required Amount for a 401(k) Plan and Cost',
  description: `ERISA bond 2026: 10 % of the funds handled, at least ${K.usd(F.min)}, at most ${K.usd(F.max)} (${K.usd(F.max_employer_securities)} with employer stock). Enter plan assets for the amount and premium.`,
  h1: 'ERISA bond: the coverage your plan needs, its cost, and fiduciary insurance',
  intro: 'Enter the plan assets handled in a year: the bond amount section 412 requires and an estimated yearly premium appear at once.',
  resume: `Every person who handles the money of an employee benefit plan covered by ERISA, such as a 401(k), a profit sharing plan or a pension, must be bonded against fraud and dishonesty under section 412 of the law. The Department of Labor sets the amount: at least 10 percent of the funds the person handled in the previous plan year, never less than ${K.usd(F.min)} per plan, and no more than ${K.usd(F.max)} required per plan official, or ${K.usd(F.max_employer_securities)} when the plan holds employer securities. A plan with ${K.usd(2000000)} of assets therefore needs a bond of ${K.usd(two.amount)}; a plan above ${K.usd(5000000)} reaches the cap. This is a fidelity bond, priced low because the plan, not the employer, is the insured party. Published fidelity grids give about ${K.usd(twoP.perYear.lo)} to ${K.usd(twoP.perYear.hi)} a year for the ${K.usd(two.amount)} bond, and ${K.usd(cap.perYear.lo)} to ${K.usd(cap.perYear.hi)} at the ${K.usd(F.max)} cap, with good credit.`,
  tool: 'bond', toolArg: { bt: 'erisa', lock: 1, pa: 2000000 },
  body: (h) => `
<h2>Who must be bonded</h2>
<p>The bond covers every "plan official" who handles plan funds or other property: trustees, the employer's staff who process contributions, administrators who can move money, and anyone with authority to sign checks or direct transfers. The plan is the insured. If an official steals or embezzles, the plan recovers from the bond. The ${h.fedLink('erisa', 'Department of Labor Field Assistance Bulletin 2008-04')} explains who handles funds and what counts as the funds handled.</p>
<p>Some are exempt: certain banks, insurance companies and registered broker-dealers that are already subject to supervision, and plans that are unfunded, paying benefits from the employer's general assets. A small business sponsoring a 401(k) almost always needs a bond.</p>
<h2>The amount: 10 percent, with a floor and a cap</h2>
<p>The bond must cover at least 10 percent of the funds the person handled in the preceding plan year. For a new plan, the estimate of what will be handled in the first year is used. The minimum is ${K.usd(F.min)} per plan and the maximum required is ${K.usd(F.max)} per plan official, raised to ${K.usd(F.max_employer_securities)} for plans that hold employer securities. A plan can buy more, and many do, but the law does not require it.</p>
${h.table(['Plan funds handled', 'Required bond', 'Which rule applies'], ex.map(({ a, b }) => [K.usd(a), K.usd(b.amount), b.rule === 'min' ? `${K.usd(F.min)} minimum` : b.rule === 'max' ? `${K.usd(F.max)} cap` : '10 % of funds']), 'ERISA section 412 bond amounts, plan without employer securities', ['r', 'r', 'l'])}
${h.mini('bond', { t: 'Bond for your plan assets', p: ['pa', 'es'], d: { bt: 'erisa', lock: 1, pa: 750000 } })}
<h2>What it costs</h2>
<p>ERISA bonds are fidelity bonds: they protect against theft by plan officials, a rare event in a small plan with an outside recordkeeper. They are therefore cheap. On published fidelity grids, a ${K.usd(two.amount)} bond costs about ${K.usd(twoP.perYear.lo)} to ${K.usd(twoP.perYear.hi)} a year with good credit, and the minimum premium of most markets applies to small plans. Many providers sell three-year ERISA bonds paid upfront, which suits a requirement that rarely changes.</p>
<p>Some providers add an automatic increase, an "inflation guard", so the bond keeps up with plan growth without a new policy. That clause is worth having: a plan that grows past the bonded amount falls out of compliance without anyone noticing.</p>
<h2>How it shows on Form 5500</h2>
<p>The annual Form 5500 asks whether the plan was covered by a fidelity bond and for how much. A plan that answers no, or reports a bond below 10 percent of its assets, invites questions from the Department of Labor. Small plans that want the waiver of the independent audit must also meet bonding rules, sometimes at a higher level for assets that are not held by a regulated institution.</p>
<h2>ERISA bond vs fiduciary insurance</h2>
<p>An ERISA bond is not fiduciary liability insurance. Fiduciary insurance protects the people who run the plan against claims that they made poor decisions, such as high fees or bad investments. The ERISA bond protects the plan against dishonesty. The law requires only the bond; fiduciary insurance is optional, and a policy named "fiduciary" does not satisfy section 412 unless it includes the required fidelity coverage. For the general mechanics of a surety relation, see ${h.a('what-is-a-surety-bond', 'what a surety bond is')}.</p>
<h2>Who buys it and when</h2>
<p>The plan sponsor, usually the employer, arranges the bond, and the cost may be paid from plan assets in many cases because the bond protects the plan. It must be in force from the moment someone handles plan funds, so a new 401(k) needs it before the first contribution is deposited. The bond is reviewed each year when the Form 5500 is prepared: the plan's assets at the start of the year set the next year's required amount. A plan that has grown quickly, through rollovers or a merger, may need a larger bond than the one bought at launch.</p>
<h2>One bond, several plans or officials</h2>
<p>A single bond can cover several plans of the same employer and several officials, as long as each plan is covered for the amount it requires. The bond must name each plan as an insured. Providers often write the bond to cover "all plan officials" rather than named individuals, which avoids gaps when staff change. The bond must be issued by a surety on the Treasury list of approved sureties, and it cannot carry a deductible that reduces the required coverage.</p>
`,
  faqs: [
    { q: 'How much ERISA bond coverage does a 401(k) plan need?', a: `At least 10 percent of the funds each official handled in the previous plan year, with a ${K.usd(F.min)} minimum per plan and a ${K.usd(F.max)} maximum required per official. A plan with ${K.usd(2000000)} of assets needs ${K.usd(two.amount)}. Plans holding employer securities have a ${K.usd(F.max_employer_securities)} maximum instead.` },
    { q: 'How much does an ERISA bond cost?', a: `It is one of the cheapest bonds, because the risk is theft by plan officials. On published fidelity grids, a ${K.usd(two.amount)} bond costs about ${K.usd(twoP.perYear.lo)} to ${K.usd(twoP.perYear.hi)} a year with good credit, and the minimum premium of most markets applies to small plans. Three-year terms paid at once are common.` },
    { q: 'Is an ERISA bond the same as fiduciary insurance?', a: 'No. The bond protects the plan if an official steals or commits fraud, and section 412 requires it. Fiduciary liability insurance protects the officials against claims of poor decisions, and the law does not require it. A plan can carry both, but only the fidelity bond satisfies the bonding rule.' },
    { q: 'What happens if a plan has no ERISA bond?', a: 'The plan is out of compliance with ERISA section 412. Form 5500 asks about the bond each year, so a missing or insufficient bond is visible to the Department of Labor and can trigger an inquiry. Officials who handle funds without a bond also expose themselves personally. Buying the bond is usually quick and inexpensive.' },
  ],
  related: ['surety-bond-cost', 'what-is-a-surety-bond', 'freight-broker-bond', 'probate-bond'],
  sources: ['dol_fab_2008_04', 'sbcalc'],
});
