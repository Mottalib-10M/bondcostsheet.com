import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'texas';
const r = K.R(T, S);
const e = K.notary(r.amount!);
const med = K.median(K.states(T).filter((x) => x.required && x.amount).map((x) => x.amount!));

export default defineState({
  bond: T, slug: S,
  title: 'Texas Notary Bond 2026: $10,000 Required, Price and Filing',
  h1: 'Texas notary bond: the $10,000 amount, its cost, and the bonding companies allowed',
  description: `Texas notary bond 2026: ${K.usd(r.amount!)} for a four-year commission under Gov't Code 406.010, approved by the Secretary of State, about ${K.usd(e.lo)} to ${K.usd(e.hi)} paid only once.`,
  intro: `Texas requires a ${K.usd(r.amount!)} surety bond for each four-year notary commission; it usually sells for a flat ${K.usd(e.lo)} to ${K.usd(e.hi)}.`,
  resume: `Every Texas notary public must secure a ${K.usd(r.amount!)} surety bond from a surety company authorized to write bonds in Texas before the commission is issued. The rule is in section 406.010 of the Government Code, and the Secretary of State's notary page repeats it in the same words. The bond runs for the full four-year commission, is payable to the governor and must be approved by the Secretary of State, which receives it with the application. It protects anyone harmed by an improper notarization, not the notary. Texas sits at the median of the states read for this site, ${K.usd(med)}. Because notary bonds rarely produce claims, sureties sell the Texas bond at a flat price for the whole term, usually without a credit check: about ${K.usd(e.lo)} to ${K.usd(e.hi)} on published offers. Errors and omissions insurance is a separate, optional policy. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>What the law asks</h2>
<p>Section 406.010 of the Texas Government Code sets the bond at ${h.cite(T, S)}, executed by a solvent surety company authorized to do business in Texas. The Secretary of State's page states it plainly: "A notary public must secure a $10,000 surety bond." The bond is conditioned on the faithful performance of the notary's duties and is payable to the governor for the benefit of anyone injured. The commission is not issued until the Secretary of State approves the bond along with the application and the filing fee.</p>
<p>In practice, most applicants buy the bond through a bonding agency that also files the application for them. The agency submits the bond, the oath and the fee electronically, and the commission certificate comes back once approved. Applicants who file themselves send the bond with the paper or online application.</p>
<h2>What it costs, and what it does not cover</h2>
<p>A Texas notary bond is one of the cheapest surety bonds in the state. Sureties price it once for the four years, and the published offers range around ${K.usd(e.lo)} to ${K.usd(e.hi)}. Bundles that add a stamp, a journal and insurance cost more, but only the bond is required. If a claim is paid, the surety will ask the notary to repay it in full: the bond protects the public.</p>
<p>That is why many Texas notaries also buy errors and omissions insurance. It pays for the notary's defense and for honest mistakes, and it is the notary's own protection. Texas does not require it, and it never replaces the bond.</p>
${h.mini('bond', { t: 'Compare with another state or bond', p: ['bt', 'st'], d: { bt: T, st: 'louisiana' } })}
<h2>Choosing a Texas notary bonding company</h2>
<p>Any bonding company can sell you the bond, as long as the surety that issues it is authorized to do business in Texas, the condition section 406.010 sets. The Texas Department of Insurance publishes a company lookup that shows whether an insurer or surety holds a Texas certificate of authority; the name to check is the surety printed on the bond, not the agency's brand. The Secretary of State does not sell the bond.</p>
<p>Offers differ mainly in what comes with the bond: filing help, a seal, a record book, insurance. Since the bond itself costs about the same everywhere, compare the bond line alone, and make sure the vendor files it within the commission application rather than leaving it to you.</p>
<h2>Renewing and changing details</h2>
<p>Each new four-year commission needs a new bond; the old one does not carry over. A notary who changes name or address during the term notifies the Secretary of State, and some sureties issue a rider to update the bond. Texas also commissions online notaries, who must hold a traditional commission first and register separately; the ${K.usd(r.amount!)} bond of the traditional commission stays the reference. The ${h.a('notary-bond', 'notary bond comparison')} shows how Texas sits next to the ${h.a('state:notary:florida', 'Florida')} and ${h.a('state:notary:california', 'California')} amounts.</p>
`,
  faqs: [
    { q: 'How much is a notary bond in Texas?', a: `The bond amount is ${K.usd(r.amount!)}, set by section 406.010 of the Government Code, for the four-year commission. The price is far lower: a flat premium paid once, usually ${K.usd(e.lo)} to ${K.usd(e.hi)} for the whole term on published offers, without a credit check. Packages with a seal and insurance cost more.` },
    { q: 'Who approves the Texas notary bond?', a: 'The Texas Secretary of State. The bond is executed by a surety company authorized in Texas, made payable to the governor, and filed with the commission application. The commission is issued only after the Secretary of State approves the bond, the oath and the application fee.' },
    { q: 'Does errors and omissions insurance replace the Texas notary bond?', a: `No. The ${K.usd(r.amount!)} bond is required by law and protects the public. Errors and omissions insurance is optional and protects the notary against claims for honest mistakes, including legal defense costs. Many Texas notaries buy both, often in one package from the bonding agency.` },
    { q: 'How do I check that a Texas notary bonding company is legitimate?', a: 'Look at the surety named on the bond, then search it in the Texas Department of Insurance company lookup, which shows whether it holds a certificate of authority in Texas. Section 406.010 requires a surety authorized to do business in the state. The agency selling the bond may be a reseller; what counts is the surety behind it.' },
  ],
  related: ['notary-bond', 'state:notary:florida', 'state:notary:louisiana', 'what-is-a-surety-bond'],
});
