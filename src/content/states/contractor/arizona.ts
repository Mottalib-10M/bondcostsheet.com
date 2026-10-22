import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'contractor', S = 'arizona';
const r = K.R(T, S);
const v = r.variants;
const p = (a: number, t: 't1' | 't3' = 't1') => K.credit('license', t, a).perYear;
const lo = Math.min(...v.map((x) => x.amount)), hi = Math.max(...v.map((x) => x.amount));

export default defineState({
  bond: T, slug: S,
  h1: 'Arizona contractor bond: the amount for your license and volume',
  title: 'Arizona Contractor Bond 2026: ROC Amounts by Annual Volume',
  description: `Arizona contractor bond 2026: ROC amounts from ${K.usd(lo)} to ${K.usd(hi)} under A.R.S. 32-1152, set by license type and yearly volume, the recovery fund, premium.`,
  intro: `Arizona's Registrar of Contractors sets the bond by license type and estimated annual volume, from ${K.usd(lo)} to ${K.usd(hi)} in the tiers read.`,
  resume: `Arizona does not have one contractor bond amount. Under A.R.S. 32-1152, the Registrar of Contractors sets it from two things the applicant declares: the license type, residential, commercial or dual, general or specialty, and the estimated annual volume of work. A residential specialty contractor doing less than ${K.usd(375000)} a year files ${K.usd(v[2].amount)}; at ${K.usd(375000)} or more, ${K.usd(v[3].amount)}. A residential general contractor files ${K.usd(v[0].amount)} under ${K.usd(750000)} and ${K.usd(v[1].amount)} above. Commercial bonds run higher, from ${K.usd(v[4].amount)} for a commercial general contractor at ${K.usd(150000)} or less to ${K.usd(hi)} above ${K.usd(10000000)}. Residential contractors also pay into the state's Residential Contractors' Recovery Fund, or post an additional bond instead. Premiums are modest at the lower tiers: on published grids, about ${K.usd(p(v[2].amount).lo)} to ${K.usd(p(v[2].amount).hi)} a year for the ${K.usd(v[2].amount)} bond with a credit score of 700 or more. Rule read on ${K.day(r.read)}.`,
  toolArg: { vr: '2' },
  body: (h) => `
<h2>Volume sets the amount</h2>
<p>The ROC's bond page (${h.cite(T, S, 'Arizona ROC')}) publishes a table for each license category, with a bond amount for each band of annual volume. The volume is the contractor's estimate of the gross dollar amount of work in a year, declared on the application and updated at renewal. A growing contractor that moves to a higher band must raise its bond, usually by rider. Declaring a lower volume than the business really does is a violation in itself.</p>
${h.table(['License and volume', 'Bond', 'Premium a year, credit 700+'], v.map((x) => [x.label, K.usd(x.amount), `${K.usd(p(x.amount).lo)} to ${K.usd(p(x.amount).hi)}`]), 'Some of the Arizona ROC bond tiers, with estimated premiums', ['l', 'r', 'r'])}
<p>The tiers shown are among those on the ROC table; intermediate bands exist for commercial licenses, so check the exact one for your license class and volume before buying.</p>
${h.mini('bond', { t: 'Your Arizona tier and its premium', p: ['vr', 'cr'], d: { bt: T, lock: 1, st: S, vr: '0', cr: 't2' } })}
<h2>The recovery fund</h2>
<p>Residential contractors in Arizona also contribute to the Residential Contractors' Recovery Fund, which pays homeowners harmed by licensed contractors beyond what the bond covers, or post an additional bond instead of contributing. The fund is why Arizona's residential bonds look small next to ${h.a('state:contractor:california', 'California')}'s ${K.usd(K.amt(T, 'california'))}: homeowners have a second source of recovery. Commercial contractors do not contribute and rely on the bond alone.</p>
<p>Dual licenses, residential and commercial, carry both bonds. The ${h.a('contractor-license-bond', 'contractor bond overview')} compares Arizona's tiered approach with ${h.a('state:contractor:oregon', 'Oregon')}'s endorsements and Nevada's case-by-case amounts.</p>
<h2>Practical points before buying</h2>
<p>Read your volume band carefully. The bond is chosen from the estimate you put on the application, and the ROC can ask for records that support it. Choosing a band that matches the business as it will be over the next year avoids a rider a few months after licensing. The bond names the licensee exactly as the ROC will: an individual, a partnership, a corporation or an LLC, with any trade name. When a contractor adds a license class, for example a commercial specialty on top of a residential one, a new bond goes with it. And because the lower Arizona tiers fall below ${K.usd(10000)}, the minimum premium of most sureties often decides the price more than the rate does, so quotes for small bonds tend to look alike.</p>
`,
  faqs: [
    { q: 'How is the Arizona contractor bond amount set?', a: 'By the license type and the estimated annual volume of work the applicant declares to the Registrar of Contractors, under A.R.S. 32-1152. Each license category has a table with bands of volume and a bond for each band. A contractor whose volume grows into a higher band must raise the bond.' },
    { q: 'What is the smallest Arizona contractor bond?', a: `Among the tiers read for this site, ${K.usd(lo)}, for a residential specialty contractor doing less than ${K.usd(375000)} of work a year. With good credit, that bond costs about ${K.usd(p(lo).lo)} to ${K.usd(p(lo).hi)} a year on published grids, close to the minimum premium most sureties charge.` },
    { q: 'Do Arizona residential contractors pay anything besides the bond?', a: 'Yes. They contribute to the Residential Contractors\' Recovery Fund, which compensates homeowners harmed by licensed residential contractors, or they post an additional bond instead. The contribution is paid with the license fees. Commercial-only contractors do not contribute and rely on their bond.' },
  ],
  related: ['contractor-license-bond', 'state:contractor:california', 'state:contractor:oregon', 'license-and-permit-bond'],
});
