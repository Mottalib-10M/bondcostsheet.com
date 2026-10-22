import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'auto-dealer', S = 'california';
const r = K.R(T, S);
const p = (t: 't1' | 't3' | 't5') => K.credit('dealer', t, r.variants[0].amount).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'California Dealer Bond 2026: $50,000 on DMV Form OL 25, Cost',
  description: `California dealer bond 2026: ${K.usd(r.variants[0].amount)} under Vehicle Code 11710 on DMV form OL 25, the cash deposit option, the wholesale exemption, about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year.`,
  intro: `California dealers file a ${K.usd(r.variants[0].amount)} continuous bond on DMV form OL 25; with good credit it costs about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year.`,
  resume: `A California vehicle dealer, retail or wholesale, must file a ${K.usd(r.variants[0].amount)} surety bond with the Department of Motor Vehicles under section 11710 of the Vehicle Code. The DMV's own bond form, OL 25, binds the dealer and the surety to the People of the State of California "in the penal sum of FIFTY THOUSAND DOLLARS". The bond is continuous: it stays in force until cancelled, and the dealer pays the surety a premium each year. A cash deposit on form OL 25E can replace it, but ties up the full amount. Wholesale-only dealers that sell fewer than 25 vehicles a year can claim an exemption on form OL 56. The premium depends on the owner's credit: on published dealer grids, about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year with a score of 700 or more, ${K.usd(p('t3').lo)} to ${K.usd(p('t3').hi)} between 600 and 649, and ${K.usd(p('t5').lo)} to ${K.usd(p('t5').hi)} under 550. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The OL 25 bond</h2>
<p>California does not accept a generic dealer bond. The surety must use DMV form OL 25, whose wording binds the principal and surety "${r.quote}" (${h.cite(T, S, 'DMV form OL 25')}). The form names the dealer exactly as licensed, with any fictitious business name, and carries the surety's signature and power of attorney. A bond on another form is returned, and the license application waits.</p>
<p>The bond is continuous. It does not expire with the license year; it runs until the surety or the dealer cancels it with notice to the DMV. The surety bills its premium each year, and a dealer who stops paying will see the bond cancelled and the license suspended unless a new bond is filed in time.</p>
<h2>Cash instead of a bond, or no bond at all</h2>
<p>A dealer can deposit ${K.usd(r.variants[0].amount)} in cash with the DMV on form OL 25E instead of buying a bond. It avoids the premium but freezes the money for as long as the license exists, and the deposit is returned only after the license ends and any claims period passes. Few new dealers choose it.</p>
<p>Wholesale-only dealers that sell fewer than 25 vehicles in a 12-month period can file an exemption on form OL 56 and skip the bond. Crossing the 25-vehicle line ends the exemption, and a bond must then be filed.</p>
${h.mini('bond', { t: 'California next to other states', p: ['st', 'cr'], d: { bt: T, lock: 1, st: 'texas', cr: 't2' } })}
<h2>What it costs</h2>
<p>The premium is priced on the owners' personal credit and their experience in the trade. With a score of 700 or more, published grids give ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year. A new dealer with no prior license may pay more within the same credit tier. The ${h.a('auto-dealer-bond', 'dealer bond overview')} compares California with ${h.a('state:auto-dealer:texas', 'Texas')}, which asks the same amount for a two-year license.</p>
`,
  faqs: [
    { q: 'What bond does a California car dealer need?', a: `A ${K.usd(r.variants[0].amount)} surety bond on DMV form OL 25, under Vehicle Code section 11710, for retail and wholesale dealers. The bond is continuous and the premium is paid yearly. A cash deposit on form OL 25E can replace it, and wholesale-only dealers selling fewer than 25 vehicles a year may claim an exemption.` },
    { q: 'How much does a California dealer bond cost per year?', a: `With a credit score of 700 or more, about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year on published dealer grids. Between 600 and 649, about ${K.usd(p('t3').lo)} to ${K.usd(p('t3').hi)}. Under 550, ${K.usd(p('t5').lo)} to ${K.usd(p('t5').hi)} if a surety accepts. Experience in the trade also moves the price.` },
    { q: 'Can a California wholesale dealer skip the bond?', a: 'Only a wholesale-only dealer that sells fewer than 25 vehicles in a 12-month period, by filing form OL 56 with the DMV. A wholesaler above that volume, and every retail dealer, files the $50,000 OL 25 bond or the equivalent cash deposit on form OL 25E.' },
  ],
  related: ['auto-dealer-bond', 'state:auto-dealer:texas', 'state:auto-dealer:new-york', 'surety-bond-cost'],
});
