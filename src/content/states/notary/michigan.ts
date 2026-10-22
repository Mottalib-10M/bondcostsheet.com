import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'notary', S = 'michigan';
const r = K.R(T, S);
const o = r.official!;

export default defineState({
  bond: T, slug: S,
  title: 'Michigan Notary Bond 2026: $10,000, State Says $50 to $100',
  description: `Michigan notary bond 2026: ${K.usd(r.amount!)} under MCL 55.273 for the six to seven year commission; the Department of State itself puts its usual cost at ${K.usd(o.low)} to ${K.usd(o.high)}.`,
  intro: `Michigan requires a ${K.usd(r.amount!)} notary bond, and its Department of State publishes the price: generally ${K.usd(o.low)} to ${K.usd(o.high)}.`,
  resume: `A Michigan notary public must file a ${K.usd(r.amount!)} bond with good and sufficient surety by a surety licensed in the state, under section 55.273 of the Michigan Compiled Laws, before the commission takes effect. Michigan is one of the rare states that publishes what the bond costs: the Department of State's notary FAQ says the cost of the surety bond will vary, generally between ${K.usd(o.low)} and ${K.usd(o.high)}. That price covers the whole commission, which in Michigan runs six to seven years, ending on the notary's birthday, longer than the four years most states use. The bond is filed with the county clerk of the county of residence before the application goes to the state. Attorneys in good standing with the State Bar of Michigan are exempt from the bond. The bond protects people harmed by a notarization; the surety recovers from the notary any amount it pays. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The rule and the price the state publishes</h2>
<p>MCL 55.273 sets the bond "in the sum of ${h.cite(T, S, '$10,000.00')} with good and sufficient surety by a surety licensed to do business in this state". The Department of State goes one step further than most states and gives the price: "${o.quote}" (${h.ext(o.url, 'Michigan notary FAQ')}). This site uses that range for Michigan instead of its own estimate.</p>
<p>The price covers the full commission. Because Michigan commissions run six to seven years, to the notary's birthday after the sixth anniversary, the bond also runs that long, which makes the yearly cost lower than in most states.</p>
<h2>The order of steps</h2>
<p>Michigan puts the county first. The applicant buys the bond, then files it with the county clerk of the county of residence, where the clerk records it and signs the application. Only then does the application go to the Department of State, which issues the commission. A bond bought with a typo in the name, or filed in the wrong county, sends the applicant back to the start, so check both before paying.</p>
${h.mini('bond', { t: 'Michigan next to other states', p: ['bt', 'st'], d: { bt: T, st: 'illinois' } })}
<h2>Exemptions and moves</h2>
<p>Attorneys licensed and in good standing in Michigan do not need to file the bond, though they still apply for the commission. Nonresidents who work in Michigan can be commissioned too, and file the bond in the county where they work. A notary who moves to another county during the term notifies the state; the bond remains in force. The ${h.a('notary-bond', 'notary bond overview')} shows that only a few states publish a price as Michigan does, and the ${h.a('state:notary:indiana', 'Indiana page')} covers another long commission.</p>
<p>Michigan's published range is useful beyond the state: it confirms that notary bonds, even for long terms, sell for tens of dollars rather than hundreds. A Michigan quote far above ${K.usd(o.high)} for the bond alone is likely a package.</p>
`,
  faqs: [
    { q: 'How much does a Michigan notary bond cost?', a: `The Michigan Department of State says the bond generally costs ${K.usd(o.low)} to ${K.usd(o.high)}. That price covers the whole commission, which lasts six to seven years. The bond amount itself is ${K.usd(r.amount!)}, set by MCL 55.273, and it is bought from a surety licensed in Michigan.` },
    { q: 'Where do I file my Michigan notary bond?', a: 'With the county clerk of the county where you live, or where you work if you are a nonresident. The clerk records the bond and completes part of your application, which you then send to the Department of State. The commission is issued by the state after it receives the application from the county step.' },
    { q: 'Do Michigan attorneys need a notary bond?', a: `No. Attorneys licensed and in good standing in Michigan are exempt from the ${K.usd(r.amount!)} bond requirement, although they still apply for a notary commission and meet the other conditions. Everyone else must file the bond before the commission is issued.` },
  ],
  related: ['notary-bond', 'state:notary:illinois', 'state:notary:indiana', 'surety-bond-cost'],
});
