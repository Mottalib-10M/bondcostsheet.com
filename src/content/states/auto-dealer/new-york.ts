import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'auto-dealer', S = 'new-york';
const r = K.R(T, S);
const [small, fran, big] = r.variants;
const p = (a: number, t: 't1' | 't3' = 't1') => K.credit('dealer', t, a).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'New York Dealer Bond 2026: $20,000, $50,000 or $100,000',
  description: `New York dealer bond 2026: ${K.usd(small.amount)}, ${K.usd(fran.amount)} or ${K.usd(big.amount)} under VTL 415(6-b) by dealer type and last year's sales, exempt dealers, and the premium for each tier.`,
  intro: `New York sets three dealer bond amounts, by dealer type and last year's sales: ${K.usd(small.amount)}, ${K.usd(fran.amount)} or ${K.usd(big.amount)}.`,
  resume: `New York is the state read for this site that grades its dealer bond most finely. Under section 415(6-b) of the Vehicle and Traffic Law, as the DMV explains it, a used or wholesale motor vehicle dealer that sold 50 or fewer vehicles in the previous calendar year files a ${K.usd(small.amount)} bond; a franchised new car dealer files ${K.usd(fran.amount)}; and a used or wholesale dealer that sold more than 50 vehicles files ${K.usd(big.amount)}. The volume test is applied each year, so a growing used dealer moves from ${K.usd(small.amount)} to ${K.usd(big.amount)} once it passes 50 sales. Dealers of trailers, motorcycles, vehicles over 10,000 pounds, ATVs, boats and snowmobiles are exempt. Premiums follow the amount: on published dealer grids with a credit score of 700 or more, about ${K.usd(p(small.amount).lo)} to ${K.usd(p(small.amount).hi)} a year for ${K.usd(small.amount)}, ${K.usd(p(fran.amount).lo)} to ${K.usd(p(fran.amount).hi)} for ${K.usd(fran.amount)}, and ${K.usd(p(big.amount).lo)} to ${K.usd(p(big.amount).hi)} for ${K.usd(big.amount)}. Rule read on ${K.day(r.read)}.`,
  toolArg: { vr: '0' },
  body: (h) => `
<h2>Three amounts, one test</h2>
<p>The New York DMV's dealer bond page (${h.cite(T, S, 'NY DMV')}) lists the amounts by category, and the top tier applies to a retail or wholesale dealer, other than new, that sold more than 50 vehicles during the previous calendar year. The test is the number of vehicles sold in the previous calendar year, not the current one, so the bond is set at each registration and renewal from last year's records. A used dealer that crosses 50 sales during the year keeps its ${K.usd(small.amount)} bond until the next renewal, then files ${K.usd(big.amount)}.</p>
<p>Franchised new car dealers file ${K.usd(fran.amount)} regardless of volume. The jump from ${K.usd(small.amount)} to ${K.usd(big.amount)} for used dealers is the steepest step in any state read: a fivefold increase in the bond, and in the premium, at the 51st sale.</p>
${h.mini('bond', { t: 'Your New York tier and its premium', p: ['vr', 'cr'], d: { bt: T, lock: 1, st: S, vr: '2', cr: 't2' } })}
<h2>Who is exempt</h2>
<p>The requirement covers motor vehicle dealers. Dealers whose business is limited to trailers, motorcycles, vehicles with a gross weight over 10,000 pounds, all-terrain vehicles, boats or snowmobiles are exempt from this bond. A dealer that sells both exempt and regular vehicles needs the bond for the regular ones.</p>
<h2>What it costs, tier by tier</h2>
<p>Premiums scale with the amount, so the tier matters more than small differences between sureties. With a score of 700 or more, a ${K.usd(big.amount)} bond is estimated at ${K.usd(p(big.amount).lo)} to ${K.usd(p(big.amount).hi)} a year; between 600 and 649, ${K.usd(p(big.amount, 't3').lo)} to ${K.usd(p(big.amount, 't3').hi)}. A used dealer approaching 50 sales can plan for the higher bond before the renewal. The ${h.a('auto-dealer-bond', 'dealer bond overview')} compares New York with ${h.a('state:auto-dealer:north-carolina', 'North Carolina')}, which adds amounts by salesroom instead of by volume.</p>
<p>Keep your sales records for the calendar year at hand when renewing: the DMV relies on them to place you in a tier, and the surety needs the same figure to write the right amount.</p>
`,
  faqs: [
    { q: 'How much is a New York dealer bond?', a: `It depends on the dealer: ${K.usd(small.amount)} for a used or wholesale dealer that sold 50 or fewer vehicles last year, ${K.usd(fran.amount)} for a franchised new car dealer, and ${K.usd(big.amount)} for a used or wholesale dealer above 50 sales. The DMV sets the tier from the previous calendar year's sales.` },
    { q: 'Which New York dealers are exempt from the bond?', a: 'Dealers that sell only trailers, motorcycles, vehicles over 10,000 pounds, all-terrain vehicles, boats or snowmobiles. Every other motor vehicle dealer files the bond for its category. A dealer mixing exempt and regular vehicles still needs the bond for the regular business.' },
    { q: 'What happens when a New York used dealer passes 50 sales?', a: `At the next registration or renewal, the bond rises from ${K.usd(small.amount)} to ${K.usd(big.amount)}, because the tier is set by the previous calendar year's sales. The premium rises in proportion: with good credit, from about ${K.usd(p(small.amount).lo)} to ${K.usd(p(big.amount).lo)} or more a year at the low end.` },
  ],
  related: ['auto-dealer-bond', 'state:auto-dealer:north-carolina', 'state:auto-dealer:california', 'surety-bond-cost'],
});
