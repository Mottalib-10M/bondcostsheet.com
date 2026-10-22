import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'illinois';
const r = K.R(T, S);
const e = K.notary(r.amount!), eE = K.notary(25000);

export default defineState({
  bond: T, slug: S,
  title: 'Illinois Notary Bond 2026: $5,000, Plus $25,000 for Remote',
  description: `Illinois notary bond 2026: ${K.usd(r.amount!)} under 5 ILCS 312/2-105 for the four-year commission, plus ${K.usd(25000)} for electronic and remote notaries, and what each costs.`,
  intro: `Illinois asks ${K.usd(r.amount!)} of every notary, one of the lowest bonds, and ${K.usd(25000)} more of electronic and remote notaries.`,
  resume: `An Illinois notary public files a ${K.usd(r.amount!)} bond with a company qualified to write surety bonds in the state, under section 2-105 of the Illinois Notary Public Act (5 ILCS 312). The bond covers the four-year commission and is filed with the application to the Secretary of State. ${K.usd(r.amount!)} is among the lowest amounts in the country, half the ${K.usd(10000)} most states use, and its price is correspondingly small: the bond sells at a flat price for the whole term, usually around ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers. Electronic and remote notaries, authorized in Illinois in recent years, carry a heavier requirement: a separate ${K.usd(25000)} bond on top of the traditional one, ${K.usd(30000)} in total, which costs about ${K.usd(eE.lo)} to ${K.usd(eE.hi)} more. The bond protects people harmed by a notarization; the notary must repay any claim the surety pays. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The traditional commission</h2>
<p>Section 2-105 of the Illinois Notary Public Act requires each applicant to file, with the application, "a bond for ${h.cite(T, S, '$5,000')} with a company qualified to write surety bonds in this State". The Secretary of State issues the commission once the bond, the oath and the fee are received, and the commission is then recorded with the county clerk. The bond and the commission run together for four years.</p>
<p>Because the amount is small, the bond is the least of an Illinois notary's costs. The application fee, the county clerk's charge and a stamp usually cost more than the bond premium. Agencies that file the application on the applicant's behalf often fold all of these into one package; ask for the bond price separately if you want to compare.</p>
<h2>Electronic and remote notaries</h2>
<p>Illinois now commissions electronic notaries, who notarize electronic records, and remote notaries, who notarize through audio-video communication. Both must already hold a traditional commission and complete additional training. The Act adds a separate ${K.usd(25000)} bond for those commissions, so an Illinois notary who performs electronic or remote acts carries ${K.usd(30000)} of bonds in total. The larger bond reflects the risk of identity fraud in remote transactions.</p>
${h.mini('bond', { t: 'Illinois next to other states', p: ['bt', 'st'], d: { bt: T, st: 'michigan' } })}
<h2>Claims and insurance</h2>
<p>A person harmed by an Illinois notary's misconduct can claim on the bond, up to its amount for the whole term. With only ${K.usd(r.amount!)} at stake, a single serious claim, such as a forged real estate deed, can exhaust the bond, and the notary is then personally exposed to the rest. That gap is why errors and omissions insurance, optional in Illinois, is common among notaries who handle real estate documents. The ${h.a('notary-bond', 'notary bond overview')} compares Illinois with the ${h.a('state:notary:indiana', 'Indiana')} and ${h.a('state:notary:michigan', 'Michigan')} amounts nearby.</p>
<p>A notary who changes name or county during the term informs the Secretary of State; some sureties issue a rider so that the bond follows the change without a new purchase.</p>
`,
  faqs: [
    { q: 'How much is an Illinois notary bond?', a: `${K.usd(r.amount!)} for a traditional commission, under 5 ILCS 312/2-105, for four years. The premium is a flat price for the whole term, usually around ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers. Electronic and remote notaries add a separate ${K.usd(25000)} bond on top.` },
    { q: 'Do Illinois remote notaries need a bigger bond?', a: `Yes. On top of the ${K.usd(r.amount!)} bond of the traditional commission, electronic and remote notaries file a separate ${K.usd(25000)} bond, so ${K.usd(30000)} in total. They must also hold a traditional commission and complete the extra training before the Secretary of State issues the electronic or remote commission.` },
    { q: 'Is the Illinois notary bond enough protection for the notary?', a: `The bond does not protect the notary at all; it protects the public, and the notary must repay any claim the surety pays. With only ${K.usd(r.amount!)} of coverage, a serious claim can exceed it. Errors and omissions insurance is the policy that protects the notary, and Illinois leaves it optional.` },
  ],
  related: ['notary-bond', 'state:notary:michigan', 'state:notary:indiana', 'what-is-a-surety-bond'],
});
