import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'california';
const r = K.R(T, S);
const e = K.notary(r.amount!);

export default defineState({
  bond: T, slug: S,
  title: 'California Notary Bond 2026: $15,000 and the 30-Day Filing',
  description: `California notary bond 2026: ${K.usd(r.amount!)} under Gov. Code 8212, filed with the oath at the county clerk within 30 days, a second bond for online notaries, cost.`,
  intro: `California requires a ${K.usd(r.amount!)} notary bond, filed with the oath at the county clerk within 30 days of the commission; it costs about ${K.usd(e.lo)} to ${K.usd(e.hi)}.`,
  resume: `California sets its notary bond at ${K.usd(r.amount!)}, under section 8212 of the Government Code, among the higher amounts in the country. The deadline is what catches new notaries: the Secretary of State's handbook gives a person 30 calendar days from the beginning of the term on the commission to take and file the oath of office and file the ${K.usd(r.amount!)} surety bond with the county clerk of the county where the principal place of business is. Missing that window voids the commission, and the applicant must apply again. The commission runs four years, and online notaries need a second, separate ${K.usd(r.amount!)} bond. Like other notary bonds, it is sold at a flat price for the whole term, usually ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers. California notaries are personally liable for all damages they cause, beyond the bond amount. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The 30-day window</h2>
<p>After passing the exam and the background check, a California applicant receives a commission with a start date. From that date, the clock runs: 30 calendar days to file the oath and the ${h.cite(T, S)} bond with the county clerk, in person or by mail in some counties. Buy the bond as soon as the commission is issued, or even before, so that it is ready on the day you visit the clerk. The bond must name you exactly as the commission does, and the clerk checks it.</p>
<p>The county clerk also records the oath, and the bond becomes part of the public record. A notary who moves the principal place of business to another county later files an address change with the Secretary of State; the bond stays valid for the term.</p>
<h2>Liability beyond the bond</h2>
<p>The bond covers claims up to ${K.usd(r.amount!)} for the whole commission. California law makes the notary personally liable for all damages caused by misconduct or negligence, so a claim larger than the bond can reach the notary's own assets, and the surety will seek repayment of what it paid. That is the reason many California notaries add errors and omissions insurance, often for ${K.usd(15000)} to ${K.usd(100000)} of coverage. The insurance is optional; the bond is not.</p>
${h.mini('bond', { t: 'California next to other states', p: ['bt', 'st'], d: { bt: T, st: 'texas' } })}
<h2>Online notaries</h2>
<p>California's online notarization program requires a separate registration and a second ${K.usd(r.amount!)} bond, distinct from the traditional commission bond. A notary who performs both kinds of acts therefore carries two bonds. The traditional bond on this page is the one every California notary needs. The ${h.a('notary-bond', 'notary bond overview')} compares California with the other states read, from Wisconsin's ${K.usd(K.amt(T, 'wisconsin'))} to ${h.a('state:notary:louisiana', 'Louisiana')} at ${K.usd(K.amt(T, 'louisiana'))}.</p>
<p>Keep a copy of the filed bond and the clerk's receipt with your journal. If the Secretary of State or a claimant ever asks when the bond was filed, the receipt proves that the commission began on time.</p>
`,
  faqs: [
    { q: 'How long do I have to file my California notary bond?', a: `Thirty calendar days from the beginning of the term shown on the commission. Within that window you must file the oath of office and the ${K.usd(r.amount!)} surety bond with the county clerk of the county of your principal place of business. If you miss it, the commission is not valid and you must apply again.` },
    { q: 'How much does a California notary bond cost?', a: `The bond amount is ${K.usd(r.amount!)}; the premium for the four-year term is a flat price, usually about ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers, without a credit check. Bundles with a seal, a journal and errors and omissions insurance cost more, but only the bond is required.` },
    { q: 'Do California online notaries need another bond?', a: `Yes. Online notarization requires its own registration and a second, separate ${K.usd(r.amount!)} surety bond in addition to the traditional commission bond. A notary performing both traditional and online acts therefore keeps two separate bonds in force for the whole term.` },
  ],
  related: ['notary-bond', 'state:notary:texas', 'state:notary:florida', 'what-is-a-surety-bond'],
});
