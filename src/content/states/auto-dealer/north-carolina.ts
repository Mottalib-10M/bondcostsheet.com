import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'auto-dealer', S = 'north-carolina';
const r = K.R(T, S);
const [first, add] = r.variants;
const p = (a: number, t: 't1' | 't3' | 't5' = 't1') => K.credit('dealer', t, a).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'North Carolina Dealer Bond 2026: $50,000 Plus $25,000 a Lot',
  description: `North Carolina dealer bond 2026: ${K.usd(first.amount)} for the first salesroom and ${K.usd(add.amount)} for each additional one, under G.S. 20-288(e), form LT-409, and the premium.`,
  intro: `North Carolina dealers file ${K.usd(first.amount)} for their first established salesroom and ${K.usd(add.amount)} more for each additional one.`,
  resume: `North Carolina sets its dealer bond by the number of established salesrooms. General Statute 20-288(e) requires a bond of ${K.usd(first.amount)} for one established salesroom, and ${K.usd(add.amount)} more for each additional salesroom, so a dealer with three locations carries ${K.usd(first.amount + 2 * add.amount)} of bond. The surety bond is filed with the Division of Motor Vehicles on form LT-409; a cash bond on form LT-408 is the alternative. The bond protects buyers and the state against a dealer's failure to deliver titles, pay liens or follow the dealer laws. Premiums follow the total amount and the owner's credit: on published dealer grids, about ${K.usd(p(first.amount).lo)} to ${K.usd(p(first.amount).hi)} a year for a single-salesroom dealer with a credit score of 700 or more, ${K.usd(p(first.amount, 't3').lo)} to ${K.usd(p(first.amount, 't3').hi)} between 600 and 649, and ${K.usd(p(first.amount, 't5').lo)} to ${K.usd(p(first.amount, 't5').hi)} under 550. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The statute</h2>
<p>G.S. 20-288(e) sets the bond at "${r.quote}" (${h.cite(T, S, 'North Carolina General Statutes')}), with ${K.usd(add.amount)} for each additional established salesroom. The word "established" matters: it refers to a permanent place of business that meets the state's requirements for a salesroom, not to a temporary sale site. Dealers adding a location declare it to the DMV and increase the bond at the same time, usually by a rider from the surety.</p>
<p>The DMV accepts the surety bond on form LT-409. A dealer can instead post a cash bond on form LT-408, depositing the full amount, which ties up ${K.usd(first.amount)} or more for the life of the license.</p>
${h.mini('bond', { t: 'Bond for your number of salesrooms', p: ['vr', 'cr'], d: { bt: T, lock: 1, st: S, vr: '0', cr: 't2' } })}
<h2>Locations and premiums</h2>
<p>Because the amount grows with each salesroom, so does the premium. A dealer with two salesrooms carries ${K.usd(first.amount + add.amount)}, estimated at ${K.usd(p(first.amount + add.amount).lo)} to ${K.usd(p(first.amount + add.amount).hi)} a year with good credit. Some sureties write a single bond with the total amount; others add riders. Either way the premium is computed on the total.</p>
<h2>Compared with other states</h2>
<p>North Carolina's first-salesroom amount equals the ${K.usd(50000)} of ${h.a('state:auto-dealer:texas', 'Texas')} and ${h.a('state:auto-dealer:california', 'California')}, but its per-location increments are closer to ${h.a('state:auto-dealer:georgia', 'Georgia')}, where every location carries its own bond. New York grades by sales volume instead. The ${h.a('auto-dealer-bond', 'dealer bond overview')} has the full table.</p>
<h2>Practical points</h2>
<p>Buy the bond in the dealership's exact legal name, the one on the DMV application, and list each established salesroom it must cover. A dealer that closes a location can ask the surety to reduce the bond by ${K.usd(add.amount)}, which lowers the premium at the next billing. The bond is continuous, so it stays in force across license renewals until cancelled, and a cancellation notice gives the dealer a short window to replace it before the license is at risk. Owners with weaker credit should expect the surety to ask about their experience in vehicle sales and the source of their inventory financing.</p>
`,
  faqs: [
    { q: 'How much is a North Carolina dealer bond?', a: `${K.usd(first.amount)} for the first established salesroom and ${K.usd(add.amount)} for each additional one, under G.S. 20-288(e). With good credit, a single-salesroom dealer pays about ${K.usd(p(first.amount).lo)} to ${K.usd(p(first.amount).hi)} a year on published dealer grids. The bond is filed on DMV form LT-409.` },
    { q: 'How does the North Carolina bond change with more locations?', a: `Each additional established salesroom adds ${K.usd(add.amount)} to the bond. Two salesrooms mean ${K.usd(first.amount + add.amount)}, three mean ${K.usd(first.amount + 2 * add.amount)}. The surety usually issues a rider to raise the amount when the location opens, and the yearly premium is then recomputed on the new total.` },
    { q: 'Can a North Carolina dealer post cash instead of a surety bond?', a: `Yes, with a cash bond on DMV form LT-408 for the full amount. It avoids the yearly premium but locks up at least ${K.usd(first.amount)} for as long as the license is held. Most dealers prefer the surety bond on form LT-409 and keep their cash for inventory.` },
  ],
  related: ['auto-dealer-bond', 'state:auto-dealer:georgia', 'state:auto-dealer:new-york', 'surety-bond-cost'],
});
