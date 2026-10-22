import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'louisiana';
const r = K.R(T, S);
const e = K.notary(r.amount!);

export default defineState({
  bond: T, slug: S,
  h1: `Louisiana notary bond: ${K.usd(r.amount!)} for every notary since 2026`,
  title: 'Louisiana Notary Bond 2026: $50,000 Required, No E&O Option',
  description: `Louisiana notary bond 2026: ${K.usd(r.amount!)} for every notary since ${K.day(r.changed!)} under Act 258 of 2025; errors and omissions insurance no longer replaces it.`,
  intro: `Since ${K.day(r.changed!)}, every Louisiana notary must keep a ${K.usd(r.amount!)} bond; an insurance policy can no longer stand in for it.`,
  resume: `Louisiana changed its notary security rule more than any other state read for this site. Act 258 of 2025 amended La. R.S. 35:71 so that, from ${K.day(r.changed!)}, every notary public must maintain a bond of ${K.usd(r.amount!)}. The legislature's digest states it directly: "${r.quote}" Under the prior law a notary could choose between a ${K.usd(r.previous!)} bond and an errors and omissions insurance policy; that choice is gone, and the bond is now mandatory at five times the old amount. Louisiana notary commissions are for life, so the bond must be kept in force continuously, renewed with the surety as long as the notary practices. The price rises with the amount but remains modest for a notary bond: our estimate is about ${K.usd(e.lo)} to ${K.usd(e.hi)} per term of coverage, and some sureties sell it yearly. Louisiana is tied with Alabama for the highest notary bond read. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>What changed on February 1, 2026</h2>
<p>Before 2026, a Louisiana notary filed either a ${K.usd(r.previous!)} surety bond or proof of errors and omissions insurance. Many chose the insurance, which also protected them personally. Act 258 removed that option and raised the security to ${h.cite(T, S, K.usd(r.amount!))}, a bond only. Notaries who relied on an insurance policy had to obtain a bond, and those with a ${K.usd(r.previous!)} bond had to raise it. The legislative digest (${h.ext(r.url, 'Louisiana Legislature')}) is the clearest source for the change.</p>
<p>The stakes are higher than elsewhere: Louisiana notaries draft and execute documents, such as acts of sale and donations, that carry more weight than signatures witnessed in other states, so losses from a notary's error can be large.</p>
<h2>A bond for life</h2>
<p>A Louisiana notary commission does not expire after four years. The bond therefore has no natural end: the notary keeps it in force by renewing it with the surety, typically for a period of years at a time, and files proof with the Secretary of State. Letting it lapse can lead to suspension of the commission. Attorneys commissioned as notaries are subject to the security rules too, with the exceptions the statute sets.</p>
${h.mini('bond', { t: 'Louisiana next to other states', p: ['bt', 'st'], d: { bt: T, st: 'texas' } })}
<h2>Cost and insurance now</h2>
<p>A ${K.usd(r.amount!)} notary bond is still priced like other notary bonds, at a flat rate rather than on credit in most cases. Our estimate is ${K.usd(e.lo)} to ${K.usd(e.hi)} per term; quotes vary with the term the surety offers. Errors and omissions insurance remains available and is still the only cover that protects the notary personally; it is now in addition to the bond. See how ${h.a('state:notary:pennsylvania', 'Pennsylvania')} raised its bond the same year, or compare every state on the ${h.a('notary-bond', 'notary bond page')}.</p>
<p>Notaries who held a ${K.usd(r.previous!)} bond before 2026 should check its renewal date: the new amount applies to the bond they file going forward, and the Secretary of State expects proof of the ${K.usd(r.amount!)} bond on file.</p>
`,
  faqs: [
    { q: 'What is the Louisiana notary bond requirement in 2026?', a: `Since ${K.day(r.changed!)}, every Louisiana notary must maintain a ${K.usd(r.amount!)} bond, under La. R.S. 35:71 as amended by Act 258 of 2025. The previous rule allowed a ${K.usd(r.previous!)} bond or an errors and omissions policy instead; that alternative no longer exists.` },
    { q: 'Can Louisiana notaries still use errors and omissions insurance instead of a bond?', a: `No, not since ${K.day(r.changed!)}. Insurance can no longer be filed in place of the ${K.usd(r.amount!)} bond. Notaries can still buy errors and omissions insurance to protect themselves, but only in addition to the bond, which is now the required security for every commission.` },
    { q: 'How long does a Louisiana notary bond last?', a: 'Louisiana commissions are for life, so the bond has no fixed end. The notary keeps it in force by renewing it with the surety, usually for a set number of years at a time, and keeps proof on file with the Secretary of State. A lapse can lead to suspension of the commission.' },
  ],
  related: ['notary-bond', 'state:notary:pennsylvania', 'state:notary:texas', 'what-is-a-surety-bond'],
});
