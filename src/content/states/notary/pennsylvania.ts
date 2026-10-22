import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'pennsylvania';
const r = K.R(T, S);
const e = K.notary(r.amount!), eOld = K.notary(r.previous!);

export default defineState({
  bond: T, slug: S,
  h1: `Pennsylvania notary bond: ${K.usd(r.amount!)} since March 2026`,
  title: 'Pennsylvania Notary Bond 2026: Now $25,000, Was $10,000',
  description: `Pennsylvania notary bond 2026: raised from ${K.usd(r.previous!)} to ${K.usd(r.amount!)} on ${K.day(r.changed!)}, who keeps the old bond, the 45-day filing rule, and what it now costs.`,
  intro: `Pennsylvania raised its notary bond from ${K.usd(r.previous!)} to ${K.usd(r.amount!)} on ${K.day(r.changed!)}; new and renewing notaries buy the larger bond.`,
  resume: `Pennsylvania's notary bond is now ${K.usd(r.amount!)}, up from ${K.usd(r.previous!)}. The increase took effect on ${K.day(r.changed!)} with the new notary regulations of the Department of State, which state it in one line: "The bond amount is increased from $10,000 to $25,000." A notary commissioned before that date keeps the ${K.usd(r.previous!)} bond until the commission expires; every commission issued from that date, new or renewed, needs the ${K.usd(r.amount!)} bond. Many pages still print ${K.usd(r.previous!)}. The bond must be executed, together with the oath, and recorded with the county recorder of deeds within 45 days of commission approval, or the commission is void. It runs four years. The price rises with the amount but stays small: notary bonds sell at a flat price for the whole term, about ${K.usd(eOld.lo)} to ${K.usd(eOld.hi)} at the old amount and ${K.usd(e.lo)} to ${K.usd(e.hi)} at the new one on our estimate. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The 2026 change</h2>
<p>The Pennsylvania Department of State updated its notary regulations under the Revised Uniform Law on Notarial Acts, and the change to the bond is the most visible one for notaries: ${h.cite(T, S, `${K.usd(r.amount!)} instead of ${K.usd(r.previous!)}`)}. The new amount applies to commissions issued on or after ${K.day(r.changed!)}. A notary already commissioned before then does not need to buy a new bond mid-term; the ${K.usd(r.previous!)} bond remains valid until the commission ends, and the larger bond comes with the renewal.</p>
<p>For a person harmed by a notary, the bond amount is the most the surety will pay on all claims during the commission. Notaries handle deeds and powers of attorney whose value often runs far above ${K.usd(r.previous!)}, so the larger bond leaves a harmed person more to recover from.</p>
<h2>The 45-day steps</h2>
<p>After the Department approves an application, the new notary has 45 days to take the oath, execute the bond, and record both with the recorder of deeds in the county of residence or business, along with registering the official signature. The recorder charges its own fees. If the 45 days pass without those steps, the commission is void and the application must be made again. Ordering the bond while the application is pending avoids that risk.</p>
${h.mini('bond', { t: 'Pennsylvania next to other states', p: ['bt', 'st'], d: { bt: T, st: 'indiana' } })}
<h2>What it costs</h2>
<p>A larger bond means a larger premium, but notary bonds remain inexpensive because claims are rare. On our estimate, a ${K.usd(r.amount!)} bond for the four-year term costs about ${K.usd(e.lo)} to ${K.usd(e.hi)}. Many agencies sell it together with the education course, the stamp and errors and omissions insurance; compare the bond line alone. Pennsylvania notaries must also complete approved education before each commission. For how other states moved their amounts, see ${h.a('state:notary:louisiana', 'Louisiana')} and the ${h.a('notary-bond', 'notary bond overview')}.</p>
<p>If a commission was approved just before ${K.day(r.changed!)} but the bond was executed after it, check with the Department which amount it expects; the safer choice is the ${K.usd(r.amount!)} bond.</p>
`,
  faqs: [
    { q: 'What is the Pennsylvania notary bond amount in 2026?', a: `${K.usd(r.amount!)} for commissions issued on or after ${K.day(r.changed!)}, up from ${K.usd(r.previous!)}. The Department of State's notary regulations made the change. A notary commissioned before that date keeps the ${K.usd(r.previous!)} bond until the commission expires, then buys the larger bond at renewal.` },
    { q: 'Where is a Pennsylvania notary bond recorded?', a: 'With the recorder of deeds of the county where the notary lives or has a place of business. Within 45 days of commission approval, the notary takes the oath, executes the bond, registers the official signature and records them there. A commission not completed within 45 days is void.' },
    { q: 'Does the Pennsylvania bond increase raise the price much?', a: `Not much in dollars. Notary bonds are sold at a flat price for the whole commission, and our estimate for the ${K.usd(r.amount!)} bond is about ${K.usd(e.lo)} to ${K.usd(e.hi)}, against ${K.usd(eOld.lo)} to ${K.usd(eOld.hi)} for the old ${K.usd(r.previous!)} bond. Package prices with insurance and supplies vary more than the bond itself.` },
  ],
  related: ['notary-bond', 'state:notary:louisiana', 'state:notary:indiana', 'surety-bond-cost'],
});
