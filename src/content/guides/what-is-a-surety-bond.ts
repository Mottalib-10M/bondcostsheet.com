import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const tx = K.amt('auto-dealer', 'texas');
const txBest = K.credit('dealer', 't1', tx);
const ca = K.amt('contractor', 'california');
const caBest = K.credit('license', 't1', ca);
const recN = K.TYPES.reduce((a, t) => a + t.states.length, 0);

export default defineGuide({
  id: 'what-is-a-surety-bond', group: 'guides', order: 1, slug: 'what-is-a-surety-bond',
  nav: 'What is a surety bond', card: 'The three parties, who sets the amount, who pays the premium and what happens after a claim, with examples.',
  title: 'Surety Bond Explained 2026: Parties, Amount, Premium, Claims',
  description: `Surety bond explained for 2026: principal, obligee and surety, who sets the amount, what the premium is, and why you repay a claim. Tool for ${recN} state rules.`,
  h1: 'What a surety bond is, and how it differs from insurance',
  intro: 'A surety bond is a guarantee that you will follow a law or a contract. Pick a bond below to see the amount required and its usual price.',
  resume: `A surety bond is a written promise by a surety company that you, the principal, will meet an obligation set by a third party, the obligee: a state licensing law, a federal regulation, a court order or a construction contract. If you fail and someone is harmed, the surety pays the claim up to the bond amount, then recovers that money from you under the indemnity agreement you signed. That last point is what separates a bond from insurance: the risk stays with you, and the premium pays the surety for its credit, not for absorbing losses. The obligee sets the amount, for instance ${K.usd(tx)} for an independent car dealer in Texas or ${K.usd(ca)} for a California contractor. The surety sets the premium, usually a small share of the amount: about ${K.usd(txBest.perYear.lo)} to ${K.usd(txBest.perYear.hi)} a year for that Texas dealer bond with good credit, on published rate grids.`,
  tool: 'bond', toolArg: { bt: 'contractor', st: 'california' },
  body: (h) => `
<h2>Three parties, one promise</h2>
<p>Every surety bond names three parties. The principal is the person or business that must be bonded: the notary, the car dealer, the contractor, the freight broker, the executor of an estate. The obligee is the party that requires the bond and can claim on it: a state agency, a federal agency, a court or a project owner. The surety is the insurance company that issues the bond and promises the obligee that the principal will do what the law or contract says.</p>
<p>The promise is limited by the bond amount, also called the penal sum. It is the most the surety will pay on all claims during the bond's term. A ${h.cite('notary', 'texas', `${K.usd(K.amt('notary', 'texas'))} Texas notary bond`)} can pay at most that sum to people harmed by the notary's acts, whatever the number of claims.</p>
<h2>Why a bond is not insurance</h2>
<p>An insurance policy transfers risk: if your house burns, the insurer pays and does not ask you to pay it back. A surety bond does not transfer risk. Before issuing it, the surety asks you, and often your spouse or your company's owners, to sign a general indemnity agreement. If the surety pays a claim, it bills you for the full amount plus its costs. The surety therefore underwrites a bond like a loan: it wants to know that you will be able to repay, which is why your credit score sets most of the price.</p>
<p>This also explains why the premium is small compared with the bond amount. Sureties price bonds expecting few losses after recovery, so the premium is closer to a fee for lending their credit than to an insurance premium.</p>
${h.mini('credit', { t: 'Premium of a bond for each credit score', p: ['am'], d: { cl: 'license', am: 25000, cr: 't1' } })}
<h2>Who sets the amount</h2>
<p>The obligee sets the amount, and it is written in a public text. For license bonds, that text is a state statute or an agency rule: Florida asks car dealers for ${h.cite('auto-dealer', 'florida')}, Washington asks general contractors for ${h.cite('contractor', 'washington')}. For federal bonds, it is a regulation: ${h.fedLink('freight-broker', `${K.usd(K.F('freight-broker').amount)} for every freight broker`)}, ${h.fedLink('erisa', '10 percent of plan funds handled')} for ERISA. For court bonds, the judge sets it from the value of the estate or the amount at stake. For contract bonds, the owner sets it, often at 100 percent of the contract price.</p>
<p>The surety cannot lower that amount; it can only decide whether to issue the bond and at what premium. That is why the amount on this site always comes from the official page, and the premium is always shown as an estimate.</p>
<h2>Four families of bonds</h2>
<p>Commercial bonds are the largest group. License and permit bonds are required to hold a license: notaries, car dealers, contractors, mortgage brokers, collection agencies and many more. Title bonds let a vehicle owner register a car whose title was lost. Federal bonds include the freight broker BMC-84 bond and the ERISA fidelity bond. The ${h.a('license-and-permit-bond', 'license and permit bond page')} covers the general case.</p>
<p>Contract bonds guarantee construction work. A ${h.a('bid-bond', 'bid bond')} promises that a winning bidder will sign the contract; a ${h.a('performance-bond', 'performance bond')} that the work will be finished; a ${h.a('payment-bond', 'payment bond')} that subcontractors and suppliers will be paid. Court bonds, such as ${h.a('probate-bond', 'probate bonds')}, guarantee that an executor, guardian or appellant will act as the court orders. Fidelity bonds protect an employer or a benefit plan against theft by employees.</p>
<h2>What happens after a claim</h2>
<p>A claim starts when the obligee or a harmed party says the principal broke the obligation: a dealer did not transfer a title, a contractor walked off a job, a broker did not pay a carrier. The surety investigates, asks the principal for its side, and pays only valid claims. Once it pays, it asks the principal for reimbursement. A principal who cannot repay may face a lawsuit, and a paid claim makes the next bond harder and dearer to obtain. For freight brokers, a paid claim that pushes the bond below ${K.usd(K.F('freight-broker').amount)} can now lead FMCSA to suspend the registration.</p>
<h2>Term, renewal and cancellation</h2>
<p>License bonds usually run one year and renew with the license, though some states set a longer term: four years for most notary commissions, three years for new Virginia dealers. A bond stays in force until the surety cancels it with notice to the obligee, often thirty days or more; the license may be suspended if no replacement bond is filed. Contract bonds cover the life of the project plus a warranty period, and their premium is paid once.</p>
<h2>Before you buy</h2>
<p>Check the exact amount and the form on the agency page: many states require their own bond form with set wording, and a bond on the wrong form is rejected. Then compare premiums against the published ranges for your credit tier. A California contractor bond of ${K.usd(ca)} is estimated at ${K.usd(caBest.perYear.lo)} to ${K.usd(caBest.perYear.hi)} a year with a score of 700 or more on published grids; a quote far above that range deserves a question.</p>
`,
  faqs: [
    { q: 'What is the difference between a surety bond and insurance?', a: 'Insurance protects you and transfers the loss to the insurer. A surety bond protects someone else, the obligee or the public, and the loss comes back to you: after paying a valid claim, the surety recovers the money from you under the indemnity agreement. That is why bonds are underwritten on your credit and priced well below the bond amount.' },
    { q: 'Who are the three parties to a surety bond?', a: 'The principal, who must be bonded and keeps the obligation; the obligee, who requires the bond and can claim on it, such as a state agency, a court or a project owner; and the surety, the insurance company that issues the bond and guarantees the principal\'s performance up to the bond amount.' },
    { q: 'Do I pay the full bond amount when I buy a surety bond?', a: `No. You pay a premium, a share of the amount, usually once a year. A ${K.usd(ca)} California contractor bond is estimated at ${K.usd(caBest.perYear.lo)} to ${K.usd(caBest.perYear.hi)} a year with good credit on published grids. The bond amount only matters if a claim is paid, and then you must repay the surety.` },
    { q: 'Can a surety refuse to issue a bond?', a: 'Yes. A surety decides whether it will guarantee you, based on credit, finances, experience and claims history. Applicants with low scores, recent bankruptcies or past bond claims may be declined, asked for collateral or placed in a high-risk program at a higher rate. A refusal by one surety does not mean every surety will refuse.' },
  ],
  related: ['surety-bond-cost', 'license-and-permit-bond', 'performance-bond', 'notary-bond', 'bad-credit-surety-bonds'],
  sources: ['bryant_cost', 'ecfr_387_307', 'dol_fab_2008_04'],
});
