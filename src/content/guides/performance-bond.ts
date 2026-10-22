import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const M = K.M.contract;
const th = K.F('miller-act').threshold, alt = K.F('miller-act').alt_from;
const c = (x: number) => K.contract(x);
const sizes = [100000, 500000, 1000000, 3000000, 10000000];

export default defineGuide({
  id: 'performance-bond', group: 'contract', order: 10, slug: 'performance-bond',
  nav: 'Performance bond', card: 'Performance and payment bonds on construction: when the Miller Act requires them, 100 percent amounts, the premium scale.',
  title: 'Performance Bond 2026: Cost per Contract Size and Miller Act',
  description: `Performance bond 2026: required at 100 % on federal construction above ${K.usd(th)} (Miller Act), premium on a sliding scale, about ${K.usd(c(1000000).premium)} for a $1,000,000 job.`,
  h1: 'Performance bond: when it is required and what it costs',
  intro: 'Enter the contract price: whether federal rules require bonds, their amount and the premium on a standard scale appear at once, layer by layer.',
  resume: `A performance bond guarantees the project owner that a contractor will complete the work as the contract says; if the contractor defaults, the surety finishes the job, pays another contractor to finish it, or pays the owner up to the bond amount. On federal construction, the Miller Act requires a performance bond and a payment bond, each for 100 percent of the contract price, on every contract above ${K.usd(th)}. Between ${K.usd(alt)} and ${K.usd(th)}, the contracting officer picks two payment protections, which need not be bonds. States, counties and cities have their own "Little Miller Acts" with their own thresholds. The premium is priced on the contract price in layers: on a published standard scale, ${K.cents(M.scale[0][1])} per $1,000 on the first ${K.usd(M.scale[0][0]!)}, ${K.cents(M.scale[1][1])} on the next ${K.usd(M.scale[1][0]!)}, and less above, so about ${K.usd(c(500000).premium)} for a $500,000 job and ${K.usd(c(1000000).premium)} for a $1,000,000 one, payment bond included.`,
  tool: 'bond', toolArg: { bt: 'performance', lock: 1, cp: 1000000 },
  body: (h) => `
<h2>What the bond guarantees</h2>
<p>The performance bond protects the owner of a project. If the contractor abandons the job, goes bankrupt or fails to meet the contract, the owner declares a default and calls the surety. The surety then chooses: finance the original contractor to finish, bring in a replacement contractor, let the owner complete and pay the extra cost, or pay the penal sum. Because the surety will turn to the contractor and its owners for every dollar spent, it underwrites the company closely before issuing the bond.</p>
<p>A performance bond almost always travels with a ${h.a('payment-bond', 'payment bond')}, which protects subcontractors and suppliers. Sureties price them together, so the premium quoted for a performance bond usually includes the payment bond.</p>
<h2>When federal law requires it</h2>
<p>The Miller Act and ${h.fedLink('miller-act', 'FAR 28.102-1')} require both bonds on any federal construction contract exceeding ${K.usd(th)}, each for 100 percent of the original contract price unless the contracting officer sets a lower amount. For contracts between ${K.usd(alt)} and ${K.usd(th)}, the officer selects two or more payment protections, such as a payment bond, an irrevocable letter of credit or a tripartite escrow. Below ${K.usd(alt)}, no bond is required by the Act.</p>
<p>States and local governments have similar laws, called Little Miller Acts, with thresholds that range from a few thousand dollars to several hundred thousand. Private owners and lenders often require performance bonds by contract too.</p>
${h.mini('bond', { t: 'Bonds required and premium for your contract', p: ['cp', 'cr'], d: { bt: 'performance', lock: 1, cp: 250000, cr: 't1' } })}
<h2>The premium scale</h2>
<p>Contract bonds are not priced at one percentage of the bond amount. Sureties use a sliding scale per $1,000 of contract price, with lower rates on higher layers. One surety publishes the following standard scale for applicants with good credit and acceptable financial statements:</p>
${h.table(['Contract price', 'Premium on the standard scale', 'Effective rate'], sizes.map((s) => [K.usd(s), K.usd(c(s).premium), `${K.dec((c(s).premium / s) * 100, 2)} %`]), 'Performance and payment bond premium, standard scale (published, October 2026)', ['r', 'r', 'r'])}
<p>Larger contractors with strong financials obtain preferred rates below this scale; contractors with thin balance sheets pay surcharges. For small jobs, some sureties run credit-only programs: up to about ${K.usd(M.creditProgramMax)}, a contractor with fair credit may be bonded at around ${K.dec(M.creditProgramRate, 0)} percent of the contract without full financial statements.</p>
<h2>What underwriters look at</h2>
<p>For contract bonds, credit is only the start. Sureties review the company's financial statements, ideally prepared by a CPA, its working capital and net worth, its work in progress, its bank line of credit, its experience with jobs of similar size and type, and the owners' personal finances. From that they set a bonding capacity: the largest single job and the total backlog they will support. Growing that capacity takes years of clean, profitable work.</p>
<h2>Premium timing and changes</h2>
<p>The premium is paid once at the start of the job, on the contract price. Change orders that raise the price raise the premium on the same scale; deductive change orders may produce a small refund at the end. Multi-year projects can carry an additional charge for each year beyond the first. Warranty periods, often a year after completion, are usually included.</p>
<h2>Bid first, then bonds</h2>
<p>On public work, the sequence starts with a ${h.a('bid-bond', 'bid bond')} submitted with the offer. The surety that writes the bid bond is signalling that it will issue the performance and payment bonds if the contractor wins, so the underwriting happens before the bid, not after.</p>
<h2>Private projects and lenders</h2>
<p>Private owners are not bound by the Miller Act, but many require performance and payment bonds anyway, especially on large commercial projects, and construction lenders often make them a condition of the loan. The terms are then whatever the contract says: some private owners accept bonds for less than 100 percent of the price, or a performance bond alone. Subcontractors are sometimes asked by the prime contractor to furnish their own bonds, which shifts part of the risk down the chain and adds a premium at each level.</p>
<p>Owners can also ask for a maintenance or warranty bond after completion, covering defects that appear during the first year or two. It is often included in the performance bond premium, sometimes priced as a small extra.</p>
`,
  faqs: [
    { q: 'How much does a performance bond cost?', a: `On a published standard scale, about ${K.usd(c(100000).premium)} for a $100,000 contract, ${K.usd(c(500000).premium)} for $500,000 and ${K.usd(c(1000000).premium)} for $1,000,000, payment bond included. That is ${K.dec((c(1000000).premium / 1000000) * 100, 2)} percent of a $1,000,000 contract. Strong contractors get lower rates; weaker ones pay more or need a credit program.` },
    { q: 'When is a performance bond required on federal work?', a: `On every federal construction contract above ${K.usd(th)}, under the Miller Act and FAR 28.102-1, together with a payment bond, each normally for 100 percent of the contract price. Between ${K.usd(alt)} and ${K.usd(th)}, the contracting officer selects two payment protections instead, which do not have to be bonds.` },
    { q: 'What is the difference between a performance bond and a payment bond?', a: 'The performance bond protects the owner if the contractor fails to finish the work as contracted. The payment bond protects subcontractors, laborers and suppliers if the contractor fails to pay them. On public jobs both are required together, and sureties price them as a pair.' },
    { q: 'Can a new contractor get a performance bond?', a: 'Often yes, for small jobs. Several sureties offer programs for contracts up to about $500,000 based mainly on personal credit, at a higher rate than the standard scale. Larger jobs need financial statements, work history and enough working capital. Starting with small bonded jobs builds the record that later supports bigger ones.' },
  ],
  related: ['payment-bond', 'bid-bond', 'contractor-license-bond', 'surety-bond-cost', 'what-is-a-surety-bond'],
  sources: ['far_28_102_1', 'far_28_102_2', 'axcess'],
});
