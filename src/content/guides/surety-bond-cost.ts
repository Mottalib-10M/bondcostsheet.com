import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const M = K.M;
const r = (c: string, t: string) => M.classes[c].rates[t];
const ex = (amt: number, c: 'license' | 'dealer' | 'freight' | 'court' | 'fidelity', t: 't1' | 't2' | 't3' | 't4' | 't5') => K.credit(c, t, amt).perYear;
const a10 = ex(10000, 'license', 't1'), a50 = ex(50000, 'license', 't1'), a50b = ex(50000, 'license', 't4');
const three = K.credit('license', 't1', 25000, 3);
const c1m = K.contract(1000000);

export default defineGuide({
  id: 'surety-bond-cost', group: 'guides', order: 2, slug: 'surety-bond-cost',
  nav: 'Surety bond cost', card: 'Premium rates by credit score and kind of bond, the minimum premium, multi-year terms and contract bond scales.',
  title: 'Surety Bond Cost 2026: Premium Rates by Credit Score, Kind',
  description: `Surety bond cost in 2026: yearly premium rates by credit score for license, dealer, freight, court and fidelity bonds, the ${K.usd(M.minimum)} minimum, and contract scales.`,
  h1: 'Surety bond cost: the premium for your amount and credit score',
  intro: 'Enter the bond amount and your credit score: the yearly premium range published rate grids give appears at once, for all five credit tiers.',
  resume: `The cost of a surety bond is its premium, a percentage of the bond amount paid each year, and the rate depends first on the kind of bond and second on your personal credit score. On the grids bond agencies publish, license and permit bonds run from ${K.dec(r('license', 't1')[0], 2)} to ${K.dec(r('license', 't1')[1], 1)} percent a year for a score of 700 or more, ${K.dec(r('license', 't3')[0], 1)} to ${K.dec(r('license', 't3')[1], 0)} percent between 600 and 649, and ${K.dec(r('license', 't5')[0], 0)} to ${K.dec(r('license', 't5')[1], 0)} percent under 550. A ${K.usd(10000)} bond therefore costs about ${K.usd(a10.lo)} to ${K.usd(a10.hi)} a year with good credit, because most markets charge a minimum premium of ${K.usd(M.minimum)}, and a ${K.usd(50000)} bond ${K.usd(a50.lo)} to ${K.usd(a50.hi)}. Freight broker bonds are rated higher, court bonds lower, notary bonds at a flat price. Contract bonds follow a scale on the contract price instead, about ${K.usd(c1m.premium)} for a $1,000,000 job.`,
  tool: 'credit', toolArg: { cl: 'license', am: 25000, cr: 't2' },
  body: (h) => `
<h2>The formula, and the two numbers in it</h2>
<p>Premium equals bond amount times rate. The bond amount comes from the law or the contract, and you cannot change it: the ${h.a('notary-bond', 'notary bond')}, ${h.a('auto-dealer-bond', 'dealer bond')} and ${h.a('contractor-license-bond', 'contractor bond')} pages give it for each state read. The rate is what a surety charges, as a percentage of that amount, for one year. It is set by the surety's filed rates and by its underwriting of your file. Nobody publishes one official rate, so the honest answer to "how much does a bond cost" is a range for your profile.</p>
<h2>Rates by credit score</h2>
<p>For license and permit bonds, the main factor is the personal credit score of the owner. The table below is the envelope of the grids published by several bond agencies, read in October 2026: for each tier, the lowest low and the highest high. It is wide on purpose; a single surety's rate for you will usually sit inside it.</p>
${h.table(['Credit score', 'License and permit', 'Auto dealer', 'Freight broker', 'Court and probate'], M.tiers.map((t) => [t.label, ...['license', 'dealer', 'freight', 'court'].map((c) => `${K.dec(r(c, t.id)[0], 2)} to ${K.dec(r(c, t.id)[1], 2)} %`)]), 'Yearly premium as a percentage of the bond amount, by credit tier', ['l', 'r', 'r', 'r', 'r'])}
<p>The jump between tiers is steep. A ${K.usd(50000)} license bond estimated at ${K.usd(a50.lo)} to ${K.usd(a50.hi)} a year with a 700 score climbs to ${K.usd(a50b.lo)} to ${K.usd(a50b.hi)} between 550 and 599. Improving a score by one tier before buying, or after the first year at renewal, can cut the premium by half or more.</p>
<h2>Why the kind of bond changes the rate</h2>
<p>Sureties price the chance of a claim they cannot recover. Freight broker bonds attract frequent claims from carriers who were not paid, so their rates start higher: ${K.dec(r('freight', 't1')[0], 2)} to ${K.dec(r('freight', 't1')[1], 0)} percent even with good credit. Court bonds for executors and guardians are supervised by a judge and rarely paid, so they start below one percent. Dealer bonds sit close to general license bonds but rise faster with poor credit, because a failing dealer can leave many unpaid title transfers at once.</p>
${h.mini('bond', { t: 'Premium for a real bond in a real state', p: ['bt', 'st', 'cr'], d: { bt: 'auto-dealer', st: 'georgia', cr: 't2' } })}
<h2>The minimum premium</h2>
<p>For small bonds, the rate stops mattering. Most markets charge at least ${K.usd(M.minimum)} a year, whatever the amount. A ${K.usd(5000)} license bond at one percent would be ${K.usd(50)}, but the premium you pay is the minimum. That is also why notary bonds, which run for the whole commission, are sold at a flat price rather than at a rate.</p>
<h2>Paying for two or three years at once</h2>
<p>Some sureties sell license bonds for two or three years with one payment. On the grid we read, two years cost ${K.dec(M.multiYear['2'], 1)} times one year and three years ${K.dec(M.multiYear['3'], 1)} times, so a ${K.usd(25000)} bond with good credit would cost ${K.usd(three.lo)} to ${K.usd(three.hi)} for three years. The saving is real, but the money is spent up front and refunds on cancellation are often limited. Check that your license term matches the bond term before choosing.</p>
<h2>Contract bonds follow a different scale</h2>
<p>Performance and payment bonds are not priced at a percentage of a fixed amount but on a sliding scale per $1,000 of contract price, with lower rates on the larger layers. On one published standard scale, a $1,000,000 contract costs ${K.usd(c1m.premium)}, and the ${h.a('performance-bond', 'performance bond page')} shows each layer. Underwriters look at the company's financial statements, work in progress and experience as much as at credit.</p>
<h2>Other factors a surety weighs</h2>
<p>Beyond credit: years in business and in the trade, past bond claims, liens and judgments, bankruptcies, the business's finances for larger bonds, and the state, since some states see more claims for a given bond. A clean history can earn a rate below the published range; a recent claim can put you in a high-risk program. The ${h.a('bad-credit-surety-bonds', 'bad credit page')} explains what those programs charge.</p>
<h2>Reading a quote against the range</h2>
<p>A quote has three parts worth checking: the bond amount, which must match the agency's figure exactly; the premium, for one year or for the whole term; and any fee added by the agency, such as a filing or delivery charge, which is not part of the premium. Compare the premium alone with the range for your tier. A quote at the bottom of the range for a weaker tier is a good sign that the surety weighed more than the score; one well above the top of your tier calls for a second quote. Remember that the range describes a year of coverage on most bonds, but the whole commission on notary bonds and the whole project on contract bonds.</p>
`,
  faqs: [
    { q: 'What percentage of the bond amount is the premium?', a: `It depends on credit and on the kind of bond. For license and permit bonds, published grids run from ${K.dec(r('license', 't1')[0], 2)} to ${K.dec(r('license', 't1')[1], 1)} percent a year with a score of 700 or more, up to ${K.dec(r('license', 't5')[0], 0)} to ${K.dec(r('license', 't5')[1], 0)} percent under 550. Freight broker bonds start higher and court bonds lower. A minimum premium near ${K.usd(M.minimum)} applies to small bonds.` },
    { q: 'How much does a $10,000 surety bond cost?', a: `With good credit, about ${K.usd(a10.lo)} to ${K.usd(a10.hi)} a year for a license bond, because the minimum premium of most markets applies before the rate does. With poor credit it can reach ${K.usd(ex(10000, 'license', 't5').lo)} to ${K.usd(ex(10000, 'license', 't5').hi)}. A $10,000 notary bond is cheaper, sold at a flat price for the whole commission.` },
    { q: 'Is a surety bond premium paid monthly or yearly?', a: 'Most license bond premiums are paid once a year, in full, at issue and at each renewal. Some agencies offer multi-year terms paid upfront, and a few finance large premiums in installments through a lender. Contract bonds are paid once for the project, and notary bonds once for the whole commission.' },
    { q: 'Does checking a surety bond price affect my credit score?', a: 'Many sureties use a soft credit check, which does not affect your score, for license bonds. Larger bonds and contract bonds may involve a fuller review with financial statements. Ask the agency which kind of check it runs before you apply. This site never checks credit: you choose a tier yourself.' },
  ],
  related: ['what-is-a-surety-bond', 'bad-credit-surety-bonds', 'license-and-permit-bond', 'performance-bond', 'freight-broker-bond'],
  sources: ['bryant_cost', 'sbcalc', 'grit', 'axcess', 'insureon_cost'],
});
