import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const R = K.M.classes;
const p = (c: 'license' | 'dealer' | 'freight', a: number, t: 't1' | 't2' | 't3' | 't4' | 't5') => K.credit(c, t, a).perYear;
const caC = K.amt('contractor', 'california'), tx = K.amt('auto-dealer', 'texas'), fb = K.F('freight-broker').amount as number;

export default defineGuide({
  id: 'bad-credit-surety-bonds', group: 'guides', order: 14, slug: 'bad-credit-surety-bonds',
  nav: 'Bonds with bad credit', card: 'What a surety bond costs under 600 and under 550, which bonds need no credit check, and how to lower the rate.',
  title: 'Bad Credit Surety Bond 2026: Rates Under 600 and Under 550',
  description: 'Bad credit surety bond 2026: rates under 600 and under 550 by kind of bond, what a California contractor or Texas dealer bond costs, and how to lower the rate.',
  h1: 'Surety bonds with bad credit: what they cost and how to pay less',
  intro: 'Pick the kind of bond, its amount and your credit score: the yearly premium a weak score brings on published grids appears at once.',
  resume: `Bad credit does not usually close the door to a surety bond, but it multiplies the price. Sureties price license bonds on the owner's personal score because they will ask the owner to repay any claim. On published grids, license and permit bonds that cost ${K.dec(R.license.rates.t1[0], 2)} to ${K.dec(R.license.rates.t1[1], 1)} percent a year with a score of 700 or more cost ${K.dec(R.license.rates.t4[0], 0)} to ${K.dec(R.license.rates.t4[1], 0)} percent between 550 and 599 and ${K.dec(R.license.rates.t5[0], 0)} to ${K.dec(R.license.rates.t5[1], 0)} percent under 550. A ${K.usd(caC)} California contractor bond goes from ${K.usd(p('license', caC, 't1').lo)} to ${K.usd(p('license', caC, 't1').hi)} a year to ${K.usd(p('license', caC, 't5').lo)} to ${K.usd(p('license', caC, 't5').hi)}. The ${K.usd(tx)} Texas dealer bond reaches ${K.usd(p('dealer', tx, 't5').lo)} to ${K.usd(p('dealer', tx, 't5').hi)}, and the ${K.usd(fb)} freight broker bond ${K.usd(p('freight', fb, 't5').lo)} to ${K.usd(p('freight', fb, 't5').hi)}. Notary and title bonds are usually sold without a credit check. Some sureties also ask for collateral when the score is very low.`,
  tool: 'credit', toolArg: { cl: 'license', am: 25000, cr: 't5' },
  body: (h) => `
<h2>Why credit drives the price</h2>
<p>A surety bond is a guarantee that the surety expects to recover. Before issuing it, the surety has you sign an indemnity agreement: if it pays a claim, you repay it. Your credit score is the surety's quickest test of whether you would. That is why the same ${K.usd(25000)} bond can cost a few hundred dollars for one applicant and several thousand for another, even when both run identical businesses. The ${h.a('surety-bond-cost', 'cost page')} shows the full grid for every tier.</p>
<h2>What bad credit costs, bond by bond</h2>
${h.table(['Bond', 'Amount', '700 or higher', '550 to 599', 'Under 550'], [
  ['California contractor', K.usd(caC), ...(['t1', 't4', 't5'] as const).map((t) => `${K.usd(p('license', caC, t).lo)} to ${K.usd(p('license', caC, t).hi)}`)],
  ['Texas auto dealer', K.usd(tx), ...(['t1', 't4', 't5'] as const).map((t) => `${K.usd(p('dealer', tx, t).lo)} to ${K.usd(p('dealer', tx, t).hi)}`)],
  ['Freight broker BMC-84', K.usd(fb), ...(['t1', 't4', 't5'] as const).map((t) => `${K.usd(p('freight', fb, t).lo)} to ${K.usd(p('freight', fb, t).hi)}`)],
], 'Estimated yearly premium, envelope of published grids', ['l', 'r', 'r', 'r', 'r'])}
<p>The steepest step is the drop below 600. On the license grid, the low end of the rate jumps from ${K.dec(R.license.rates.t2[0], 0)} percent in the 650 to 699 tier to ${K.dec(R.license.rates.t3[0], 1)} percent in the 600 to 649 tier and ${K.dec(R.license.rates.t4[0], 0)} percent below 600. Freight broker bonds are harsher still, because claims are frequent: under 550, the published rate reaches ${K.dec(R.freight.rates.t5[1], 0)} percent.</p>
${h.mini('bond', { t: 'Your bond with your score', p: ['bt', 'cr'], d: { bt: 'auto-dealer', st: 'texas', cr: 't4' } })}
<h2>Bonds where credit hardly matters</h2>
<p>Several bonds are sold without a credit check or at a flat price: ${h.a('notary-bond', 'notary bonds')}, most ${h.a('title-bond', 'title bonds')}, many small permit bonds and some bonds below ${K.usd(10000)}. For them, a weak score changes little. For larger bonds, sureties vary: some decline below 550, others accept the risk in a dedicated program with higher rates, collateral or a co-signer.</p>
<h2>Collateral, co-signers and smaller bonds</h2>
<p>When a surety hesitates, it may offer to issue the bond against collateral, often an irrevocable letter of credit or a cash deposit for part of the bond amount, returned when the bond ends without claims. A co-signer with stronger credit, usually a spouse or business partner, can sign the indemnity agreement and bring the rate down. Some agencies also accept a cash deposit or letter of credit instead of a bond, which avoids the premium but ties up money; California and Florida accept that route for dealers.</p>
<h2>How to bring the rate down</h2>
<p>Check your credit report before applying and dispute errors; a single wrong collection account can move you down a tier. Pay down revolving balances in the months before the bond renews, since utilization moves scores quickly. Clear tax liens and judgments, which many sureties treat as disqualifying. Show financial statements and business experience if the surety will consider them; for larger bonds they can outweigh the score. And ask for a re-rate at renewal: a surety that priced you at 10 percent in year one may drop the rate after a year without claims.</p>
<h2>Watch what you are sold</h2>
<p>High-risk bond programs are legitimate, but quotes vary widely. Compare at least two, ask whether the price is for one year or several, and whether any part is a fee rather than the premium. A quote far above the published range for your tier deserves a question. This site gives the range; it never asks for your score or your contact details.</p>
<h2>Bankruptcy, liens and judgments</h2>
<p>A score is not the only red flag. Sureties look at the credit report itself. An open bankruptcy usually means a decline until it is discharged; a discharged one may still push the file into a high-risk program for some years. Unpaid tax liens and civil judgments signal money owed to others who would compete with the surety for repayment, so many sureties ask for them to be cleared or on a payment plan first. Past bond claims weigh most of all: a surety that paid a claim and was not reimbursed will rarely bond the same person again, and other sureties see that history too.</p>
<h2>License timing</h2>
<p>A bond with bad credit can take longer to place, because the file goes to an underwriter instead of an automated approval. Start the bond application as soon as the license application is ready, so that the bond does not delay the license. For renewals, apply a month or two early: if the current surety declines to renew, there is time to find another one before the bond lapses and the license is suspended.</p>
`,
  faqs: [
    { q: 'Can I get a surety bond with a credit score under 550?', a: 'Often yes, through sureties that run high-risk programs, but at much higher rates and sometimes with collateral or a co-signer. Some bonds, such as notary and most title bonds, are sold without a credit check at all. Larger bonds, freight broker bonds and contract bonds are harder to obtain with very low scores.' },
    { q: 'How much more does a bond cost with bad credit?', a: `Several times more. A ${K.usd(caC)} license bond estimated at ${K.usd(p('license', caC, 't1').lo)} to ${K.usd(p('license', caC, 't1').hi)} a year with a 700 score is estimated at ${K.usd(p('license', caC, 't5').lo)} to ${K.usd(p('license', caC, 't5').hi)} under 550 on published grids. The jump is steepest below 600, where the low end of the license rate roughly triples.` },
    { q: 'Will my bond rate drop when my credit improves?', a: 'It can. License bonds renew each year, and many sureties re-rate at renewal using a fresh credit check. A year without claims and a better score can move you to a lower tier. If your surety does not re-rate, asking another surety for a quote at renewal is a common way to get the lower price.' },
  ],
  related: ['surety-bond-cost', 'license-and-permit-bond', 'auto-dealer-bond', 'freight-broker-bond', 'what-is-a-surety-bond'],
  sources: ['bryant_cost', 'sbcalc', 'grit'],
});
