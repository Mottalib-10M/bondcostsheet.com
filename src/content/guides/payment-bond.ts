import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const th = K.F('miller-act').threshold, alt = K.F('miller-act').alt_from;
const c750 = K.contract(750000);

export default defineGuide({
  id: 'payment-bond', group: 'contract', order: 11, slug: 'payment-bond',
  nav: 'Payment bond', card: 'The bond that protects subcontractors and suppliers on public work: who can claim, the 90-day notice, deadlines and cost.',
  title: 'Payment Bond 2026: Who It Protects, Claim Deadlines and Cost',
  description: `Payment bond 2026: required with the performance bond on federal work above ${K.usd(th)}, who can claim, the 90-day notice, the one-year suit limit, the premium.`,
  h1: 'Payment bond: who it protects, how to claim, what it costs',
  intro: 'Enter the contract price: whether a payment bond is required on federal work and the premium for the bond pair appear at once.',
  resume: `A payment bond guarantees that a contractor on a public project will pay its subcontractors, laborers and material suppliers. It exists because those parties cannot file a mechanic's lien on public property, so the bond takes the lien's place. On federal construction above ${K.usd(th)}, the Miller Act requires a payment bond for 100 percent of the contract price, alongside the performance bond; between ${K.usd(alt)} and ${K.usd(th)}, the contracting officer selects payment protections that may or may not be a bond. A first-tier subcontractor or supplier can claim directly. A second-tier one, with no contract with the prime contractor, must give written notice to the prime within 90 days of its last work or delivery. Any suit on the bond must be filed within one year of that last day. The premium is usually charged together with the performance bond, on the contract price: about ${K.usd(c750.premium)} for a $750,000 contract on a published standard scale.`,
  tool: 'bond', toolArg: { bt: 'performance', lock: 1, cp: 750000 },
  body: (h) => `
<h2>Why public work needs a payment bond</h2>
<p>On a private job, an unpaid subcontractor or supplier can file a lien on the property and force payment from the sale of the building if needed. Public property cannot be liened. Without a bond, a subcontractor on a federal courthouse or a county school would have no security if the prime contractor failed. The Miller Act solved this in 1935 by requiring a payment bond on federal construction, and every state followed with its own Little Miller Act for state and local projects.</p>
<p>The payment bond names the government as obligee, but the protected parties are those who furnished labor and material. They claim directly against the surety, which pays valid claims up to the bond amount and then recovers from the contractor.</p>
<h2>When it is required</h2>
<p>Under ${h.fedLink('miller-act', 'FAR 28.102-1')}, any federal construction contract exceeding ${K.usd(th)} needs a performance bond and a payment bond. The payment bond equals 100 percent of the original contract price unless the contracting officer finds that impractical. For contracts between ${K.usd(alt)} and ${K.usd(th)}, the officer selects two or more payment protections: a payment bond, an irrevocable letter of credit, a tripartite escrow or a certificate of deposit. State thresholds vary widely, and some states require payment bonds on much smaller jobs.</p>
${h.mini('bond', { t: 'Is a payment bond required on your federal contract?', p: ['cp'], d: { bt: 'performance', lock: 1, cp: 120000 } })}
<h2>Who can claim, and the deadlines</h2>
<p>The Miller Act protects two tiers. A first-tier claimant, with a direct contract with the prime contractor, can sue on the bond after 90 days have passed since its last labor or delivery if still unpaid. A second-tier claimant, such as a supplier to a subcontractor, must first send written notice to the prime contractor within 90 days of its last labor or delivery, stating the amount claimed and the party it supplied. Below the second tier, nobody is protected: a supplier to a supplier has no claim.</p>
<p>Every suit must be filed in federal court within one year after the last labor was performed or material supplied. These deadlines are strict, and a claimant who misses them loses the bond claim even with an unpaid invoice. State payment bond laws set their own notice periods, often 60 to 120 days.</p>
<h2>What it costs</h2>
<p>Most sureties price the performance and payment bonds as a pair, at one premium on the contract price. On a published standard scale, a $750,000 contract costs about ${K.usd(c750.premium)} for both bonds. When the payment bond is required alone, it is often priced at the same rate or slightly less. The ${h.a('performance-bond', 'performance bond page')} shows the scale layer by layer, and how financial statements and experience move a contractor above or below it.</p>
<h2>For subcontractors: protect your claim</h2>
<p>Ask the prime contractor or the contracting agency for a copy of the payment bond before starting work; on federal jobs, the agency must furnish a certified copy on request. Keep the dates of your last work or delivery, because every deadline counts from it. Send notices by a method that proves receipt. Small claims are usually paid once the surety sees a complete file; disputed ones may need a lawyer familiar with bond claims.</p>
<h2>For prime contractors: keep claims away</h2>
<p>A paid claim on a payment bond becomes a debt to the surety and a mark on the contractor's record, making the next bond harder to obtain. Paying subcontractors on time, collecting lien waivers with each payment, and resolving disputes early protects the bonding capacity that a contractor needs to bid the next public job.</p>
<p>The bond amount caps what all claimants together can recover. On a troubled project with many unpaid parties, claims can exceed the bond, and early, documented claims stand a better chance of full payment.</p>
<p>Prime contractors can also require payment bonds from their own subcontractors, which gives suppliers and laborers further down the chain a second, independent source of payment and protects the prime's own bond against claims it would otherwise have to absorb.</p>
`,
  faqs: [
    { q: 'Who is protected by a payment bond?', a: 'Subcontractors, laborers and material suppliers who furnished work on the bonded project and were not paid. Under the Miller Act, first-tier claimants with a direct contract with the prime contractor are protected, and so are second-tier claimants who contracted with a subcontractor, if they give notice within 90 days. Parties below the second tier are not covered.' },
    { q: 'What is the deadline to claim on a Miller Act payment bond?', a: 'A second-tier claimant must send written notice to the prime contractor within 90 days of its last labor or delivery. Any claimant must file suit within one year after the last labor or material furnished. A first-tier claimant can sue once 90 days have passed without payment. Missing a deadline forfeits the bond claim.' },
    { q: 'Is the payment bond priced separately from the performance bond?', a: `Usually not. Sureties quote one premium for the pair, on the contract price, using a sliding scale per $1,000. On a published standard scale, both bonds on a $750,000 contract cost about ${K.usd(c750.premium)}. A payment bond required alone is priced on a similar scale.` },
  ],
  related: ['performance-bond', 'bid-bond', 'contractor-license-bond', 'what-is-a-surety-bond'],
  sources: ['far_28_102_1', 'far_28_102_2', 'axcess'],
});
