import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const B = K.F('bid-guarantee');
const g = (x: number) => K.bid(x);
const capAt = B.cap / B.pct;

export default defineGuide({
  id: 'bid-bond', group: 'contract', order: 12, slug: 'bid-bond',
  nav: 'Bid bond', card: 'The federal bid guarantee of 20 percent of the bid (capped at $3 million), what it secures and what bid bonds cost.',
  title: 'Bid Bond 2026: 20% Federal Bid Guarantee, Amount and Cost',
  description: `Bid bond 2026: federal bids need a guarantee of at least 20 % of the bid price, capped at ${K.usd(B.cap)} (FAR 28.101-2). Enter a bid for the amount and the cost.`,
  h1: 'Bid bond: how much guarantee your bid needs and what it costs',
  intro: 'Enter your bid price: the federal bid guarantee amount and the premium of the bonds you would need if you win appear at once.',
  resume: `A bid bond guarantees the project owner that a bidder will sign the contract and furnish the required performance and payment bonds if its bid is accepted. If the low bidder walks away, the owner can claim the difference between that bid and the next acceptable one, up to the bond amount. On federal construction, FAR 28.101-2 sets the bid guarantee at no less than ${K.dec(B.pct * 100, 0)} percent of the bid price, capped at ${K.usd(B.cap)}: a $1,000,000 bid needs ${K.usd(g(1000000))}, and any bid above ${K.usd(capAt)} needs the ${K.usd(B.cap)} maximum. State and local owners set their own share, often 5 or 10 percent, in the invitation for bids. Many sureties issue bid bonds at no charge or for a small flat fee to contractors they already bond, because the real underwriting is for the final bonds. Those performance and payment bonds cost about ${K.usd(K.contract(1000000).premium)} for a $1,000,000 contract on a standard scale.`,
  tool: 'bond', toolArg: { bt: 'bid', lock: 1, cp: 1000000 },
  body: (h) => `
<h2>What a bid bond secures</h2>
<p>When an owner opens bids, it needs to know that the lowest bidder will actually sign. A bidder who discovers a mistake, or finds better work elsewhere, might otherwise withdraw and leave the owner to pay more to the next bidder. The bid bond makes that withdrawal costly: the surety pays the owner its loss, usually the difference to the next lowest bid, up to the bond amount, and then recovers from the bidder.</p>
<p>The bond also signals capacity. A surety that issues a bid bond is telling the owner that it has reviewed the contractor and intends to write the performance and payment bonds if the contractor wins. For that reason, bid bonds are underwritten as if the full contract were already awarded.</p>
<h2>The federal rule</h2>
<p>${h.fedLink('bid-guarantee', 'FAR 28.101-2')} requires the contracting officer to set the bid guarantee at no less than ${K.dec(B.pct * 100, 0)} percent of the bid price, but not more than ${K.usd(B.cap)}. The guarantee can be a bid bond, a certified check, a cashier's check or an irrevocable letter of credit. A bid submitted without the required guarantee, or with one that is too small, is usually rejected as nonresponsive.</p>
${h.table(['Bid price', 'Federal bid guarantee', 'Bonds if you win'], [250000, 1000000, 5000000, 20000000].map((x) => [K.usd(x), K.usd(g(x)), `${K.usd(x)} performance + ${K.usd(x)} payment`]), `Bid guarantee at ${K.dec(B.pct * 100, 0)} percent, capped at ${K.usd(B.cap)}`, ['r', 'r', 'l'])}
${h.mini('bond', { t: 'Bid guarantee for your bid', p: ['cp'], d: { bt: 'bid', lock: 1, cp: 2500000 } })}
<h2>State and local bids</h2>
<p>State agencies, counties, cities and school districts set their own bid security, and the invitation for bids is the document that counts. Common figures are 5 percent and 10 percent of the bid, and some owners set a fixed dollar amount. Private owners may ask for a bid bond too, with terms written into the bid documents. Read the instructions to bidders before ordering the bond, since a bond on the wrong form or for the wrong share can disqualify the bid.</p>
<h2>What a bid bond costs</h2>
<p>Bid bonds are often free. Sureties that already work with a contractor commonly issue bid bonds without a premium, or for a flat fee of a few hundred dollars at most, because they will earn the premium on the performance and payment bonds if the contractor wins. Contractors without a bonding relationship may pay a fee and must still pass full underwriting. The ${h.a('performance-bond', 'performance bond page')} shows what the final bonds cost on a standard scale.</p>
<h2>After the award</h2>
<p>The winning bidder has a set period, often ten days on federal work, to sign the contract and furnish the performance and payment bonds. The bid bond is then released. Other bidders' bonds are released when the contract is signed or the bids expire. A bidder who fails to sign within the period can be held to the bid guarantee, and on federal work the officer may also hold the bidder liable for excess reprocurement costs.</p>
<h2>Mistakes in bids</h2>
<p>A clerical mistake in a bid, such as a wrong total, does not always forfeit the bond. Federal rules let bidders request correction or withdrawal before award when they can show clear evidence of the mistake. Calling the contracting officer at once, before award, is the route; walking away silently is what triggers the claim.</p>
<h2>Bid bonds outside construction</h2>
<p>Bid guarantees are not limited to building. Public contracts for services, supplies and equipment sometimes require them too, especially when the owner fears that a bidder will refuse to perform at the price offered. The share and the form are again set in the solicitation. For these contracts, the surety still evaluates whether it could support a performance bond on the work, even if none is required after award.</p>
<h2>Bid bond or certified check</h2>
<p>A certified or cashier's check satisfies the federal rule too, but it takes the full ${K.usd(B.cap)} or ${K.dec(B.pct * 100, 0)} percent out of the contractor's accounts until the bids are settled, often for weeks, and a contractor bidding several jobs at once may tie up most of its working capital that way. A bid bond costs little or nothing and leaves the cash in the business. Owners generally prefer bonds too, because a check proves only that money exists today, while a bond proves that a surety has reviewed the contractor and is ready to back the performance and payment bonds that come next.</p>
`,
  faqs: [
    { q: 'How much is a bid bond for a federal contract?', a: `At least ${K.dec(B.pct * 100, 0)} percent of the bid price, capped at ${K.usd(B.cap)}, under FAR 28.101-2. A $1,000,000 bid needs a ${K.usd(g(1000000))} guarantee, and any bid above ${K.usd(capAt)} needs ${K.usd(B.cap)}. The guarantee can be a bond, a certified or cashier's check, or an irrevocable letter of credit.` },
    { q: 'Do bid bonds cost money?', a: 'Often very little. Many sureties issue bid bonds at no charge, or for a small flat fee, to contractors they already bond, because they expect to write the performance and payment bonds on the contracts the contractor wins. Contractors without an established surety relationship may pay a fee and still need full underwriting.' },
    { q: 'What happens if I win a bid and do not sign?', a: 'The owner can claim on the bid bond, usually for the difference between your bid and the next acceptable bid, up to the bond amount. The surety pays and then recovers from you. On federal work, the contracting officer may also pursue excess reprocurement costs. A mistake reported before award can sometimes be corrected instead.' },
  ],
  related: ['performance-bond', 'payment-bond', 'contractor-license-bond', 'surety-bond-cost'],
  sources: ['far_28_101_2', 'axcess'],
});
