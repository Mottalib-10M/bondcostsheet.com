import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'florida';
const r = K.R(T, S);
const e = K.notary(r.amount!);

export default defineState({
  bond: T, slug: S,
  title: 'Florida Notary Bond 2026: $7,500 Required by Statute, Cost',
  description: `Florida notary bond 2026: ${K.usd(r.amount!)} under section 117.01(7), filed through a bonding agency with the oath, payable to anyone harmed, about ${K.usd(e.lo)} to ${K.usd(e.hi)} once.`,
  intro: `Florida requires a ${K.usd(r.amount!)} bond for each four-year notary commission, filed through a bonding agency; it usually costs ${K.usd(e.lo)} to ${K.usd(e.hi)}.`,
  resume: `A Florida notary public must give a bond of ${K.usd(r.amount!)}, under section 117.01(7) of the Florida Statutes. The statute makes the bond payable to any individual harmed by a breach of duty by the notary acting in an official capacity, which means a claimant does not need to go through the state: the bond answers directly to the injured person. Florida is one of the few states where the application itself goes through a bonding agency, which files the bond, the oath and the fee with the Department of State. The commission lasts four years, and every new commission needs a new bond. Florida's amount is below the ${K.usd(10000)} most states use, and the bond is sold at a flat price for the whole term, usually ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers, without a credit check. Applicants must also complete three hours of notary education. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The statute and its wording</h2>
<p>Section 117.01(7) asks each notary to "give bond, payable to any individual harmed as a result of a breach of duty by the notary public acting in his or her official capacity, in the amount of ${h.cite(T, S, K.usd(r.amount!))}". The phrase "payable to any individual harmed" matters: a person who lost money through a forged or careless notarization claims directly on the bond, up to ${K.usd(r.amount!)} in total for the whole commission. The surety then seeks repayment from the notary.</p>
<p>The bond must be approved by the Department of State, and it is filed with the oath of office. Florida also expects new applicants to complete a three-hour course before applying; bonding agencies usually offer it free or bundled.</p>
<h2>Applying through a bonding agency</h2>
<p>In Florida, the Department of State receives notary applications from bonding agencies rather than from individuals. The agency collects the application, the oath, the course certificate and the state fee, issues the bond and sends the whole file. Agencies compete on package price, and many quote the bond, the state fee, the seal and optional insurance together. To compare, ask for the bond premium on its own line: it is a small share of most packages.</p>
${h.mini('bond', { t: 'Florida next to other states', p: ['bt', 'st'], d: { bt: T, st: 'california' } })}
<h2>Insurance and remote notaries</h2>
<p>Errors and omissions insurance is optional in Florida. It protects the notary, pays defense costs and covers honest mistakes, while the bond protects the public. Florida remote online notaries register separately with the Department of State and carry their own requirements, including a larger bond and insurance; the ${K.usd(r.amount!)} amount on this page is for the traditional commission. A notary who moves out of Florida or lets the commission lapse cannot keep notarizing on the old bond. For other states, see the ${h.a('notary-bond', 'notary bond overview')} or the ${h.a('state:notary:texas', 'Texas page')}.</p>
<p>Keep the bond certificate the agency sends; it carries the bond number you will need if you ever change your name or address with the Department of State.</p>
`,
  faqs: [
    { q: 'How much is a Florida notary bond?', a: `${K.usd(r.amount!)}, set by section 117.01(7) of the Florida Statutes, for the four-year commission. It is sold at a flat price for the whole term, about ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers, usually as part of a package that includes the state fee and the filing by the bonding agency.` },
    { q: 'Can I apply for a Florida notary commission without a bonding agency?', a: 'In practice, no. The Department of State receives traditional notary applications through bonding agencies, which file the application, the oath, the bond and the fee together. The agency you choose also sells the bond. Comparing agencies on the bond premium and the total package is the way to keep the cost down.' },
    { q: 'Who can claim on a Florida notary bond?', a: `Any individual harmed by a breach of duty by the notary acting in an official capacity, as the statute says. The claim goes to the surety, which pays valid claims up to ${K.usd(r.amount!)} for the whole commission and then recovers the money from the notary.` },
  ],
  related: ['notary-bond', 'state:notary:texas', 'state:notary:california', 'surety-bond-cost'],
});
