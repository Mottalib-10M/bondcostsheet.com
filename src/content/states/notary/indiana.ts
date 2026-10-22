import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'indiana';
const r = K.R(T, S);
const e = K.notary(r.amount!);

export default defineState({
  bond: T, slug: S,
  title: 'Indiana Notary Bond 2026: $25,000 for an Eight-Year Term',
  description: `Indiana notary bond 2026: ${K.usd(r.amount!)} with an eight-year term under IC 33-42-12-1, uploaded with the application, older $5,000 bonds, and the flat cost of the bond.`,
  intro: `Indiana requires a ${K.usd(r.amount!)} notary bond written for eight years, the length of its commission; it is uploaded with the online application.`,
  resume: `Indiana pairs one of the larger notary bonds with the longest commission read for this site. Under IC 33-42-12-1, a notary must hold a surety bond of at least ${K.usd(r.amount!)}, and the Secretary of State's guidance for its notary system says the uploaded bond must have an eight-year term and list the applicant's exact name as the principal. The commission itself lasts eight years. Notaries commissioned under the earlier rules, with a ${K.usd(5000)} bond, keep that bond until their commission expires; the ${K.usd(r.amount!)} bond applies at the next commission. Because the bond is sold once for the whole term, its price stays modest despite the amount: about ${K.usd(e.lo)} to ${K.usd(e.hi)} for eight years on our estimate, a few dollars a year. Indiana applicants also complete a short education course and exam before applying. The bond protects the public; the notary repays any claim. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>Amount, term and name</h2>
<p>The Secretary of State's FAQ for its notary system is precise: "${r.quote}" (${h.cite(T, S, 'Indiana Secretary of State')}). Three checks follow from that sentence. The amount must be at least ${K.usd(r.amount!)}; a bond for less is rejected. The term must be eight years, matching the commission, not the one or four years a generic bond may show. And the principal's name must match the application letter for letter, middle name included if the application has one.</p>
<p>Indiana runs the whole application online. The applicant buys the bond first, receives a copy from the surety, and uploads it in the state's system with the rest of the file. A bond that fails one of the three checks sends the application back.</p>
<h2>Older commissions</h2>
<p>Indiana raised its notary bond from ${K.usd(5000)} when it reformed its notary law and moved to eight-year commissions. A notary commissioned under the old rules keeps the ${K.usd(5000)} bond until that commission expires and buys the ${K.usd(r.amount!)} bond only when applying again. There is no need to replace a valid older bond mid-term.</p>
${h.mini('bond', { t: 'Indiana next to other states', p: ['bt', 'st'], d: { bt: T, st: 'pennsylvania' } })}
<h2>What it costs over eight years</h2>
<p>Sureties price notary bonds once for the term, and the risk per year is low. An eight-year ${K.usd(r.amount!)} bond is estimated here at ${K.usd(e.lo)} to ${K.usd(e.hi)}, less than ${K.usd(Math.ceil(e.hi / 8))} a year at the top of the range. Electronic and remote notaries in Indiana meet extra requirements set by the Secretary of State. For comparison, ${h.a('state:notary:pennsylvania', 'Pennsylvania')} also moved to ${K.usd(25000)} in 2026, for a four-year term, and the ${h.a('notary-bond', 'notary bond overview')} lists every state read.</p>
<p>Ask the surety for the bond in the exact format the state's system accepts, usually a PDF of the signed bond. A scan missing the surety's signature or seal is a common cause of a returned application.</p>
`,
  faqs: [
    { q: 'What notary bond does Indiana require?', a: `A surety bond of at least ${K.usd(r.amount!)}, written for an eight-year term and listing the applicant's exact name as principal, under IC 33-42-12-1 and the Secretary of State's instructions. It is uploaded with the online application. The commission also lasts eight years.` },
    { q: 'I have an older Indiana $5,000 notary bond. Must I replace it?', a: `No. A notary commissioned under the earlier rules keeps the ${K.usd(5000)} bond until the commission expires. The ${K.usd(r.amount!)} bond with an eight-year term applies when you apply for a new commission. Keep the old bond in force until then, without any rider.` },
    { q: 'How much does an eight-year Indiana notary bond cost?', a: `It is sold once for the whole term, usually without a credit check. Our estimate for a ${K.usd(r.amount!)} eight-year bond is ${K.usd(e.lo)} to ${K.usd(e.hi)}, a few dollars a year. Check that the quote is for eight years, since a shorter term will not be accepted by the state.` },
  ],
  related: ['notary-bond', 'state:notary:pennsylvania', 'state:notary:illinois', 'surety-bond-cost'],
});
