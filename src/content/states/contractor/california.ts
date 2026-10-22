import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'contractor', S = 'california';
const r = K.R(T, S);
const llc = r.variants[2].amount;
const p = (a: number, t: 't1' | 't3' | 't5' = 't1') => K.credit('license', t, a).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'California Contractor Bond 2026: $25,000 CSLB Bond and Cost',
  description: `California contractor bond 2026: ${K.usd(r.amount!)} since SB 607 for every active CSLB license, the qualifying individual bond, the ${K.usd(llc)} LLC worker bond, premium.`,
  intro: `Every active California contractor license needs a ${K.usd(r.amount!)} bond filed with the CSLB; with good credit it costs about ${K.usd(p(r.amount!).lo)} to ${K.usd(p(r.amount!).hi)} a year.`,
  resume: `California's Contractors State License Board requires a ${K.usd(r.amount!)} contractor license bond to issue, reactivate or renew an active license, under section 7071.6 of the Business and Professions Code. The amount rose from ${K.usd(r.previous!)} on January 1, 2023, under Senate Bill 607, and the CSLB states the change in a single line. The same law raised the bond of qualifying individual, needed when the license is qualified by a responsible managing employee or officer who owns less than ten percent, and the disciplinary bond, to ${K.usd(r.amount!)} each. A limited liability company also files a separate ${K.usd(llc)} bond for the benefit of its employees, on top of the license bond. The license bond protects homeowners, workers and suppliers harmed by a contractor's violation of the license law. Its price depends on the owner's credit: on published grids, about ${K.usd(p(r.amount!).lo)} to ${K.usd(p(r.amount!).hi)} a year with a score of 700 or more, ${K.usd(p(r.amount!, 't3').lo)} to ${K.usd(p(r.amount!, 't3').hi)} between 600 and 649, and ${K.usd(p(r.amount!, 't5').lo)} to ${K.usd(p(r.amount!, 't5').hi)} under 550. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>Three bonds, one amount</h2>
<p>The CSLB's bond page sums up the 2023 change: "${r.quote}" (${h.cite(T, S, 'CSLB')}). Every active license needs the contractor license bond. A license qualified by a responsible managing employee, or by a responsible managing officer or manager who holds less than ten percent of the voting stock or membership interest, also needs a bond of qualifying individual, unless that person is exempt. The disciplinary bond is ordered by the Registrar after a disciplinary action, as a condition of reinstatement, and can be set higher.</p>
<p>LLCs carry an extra layer: a ${K.usd(llc)} bond for the benefit of employees, covering unpaid wages and benefits. It does not replace the license bond; an LLC files both.</p>
${h.mini('bond', { t: 'Which California bond, and its premium', p: ['vr', 'cr'], d: { bt: T, lock: 1, st: S, vr: '2', cr: 't2' } })}
<h2>Inactive licenses and renewals</h2>
<p>An inactive license needs no bond. The bond must be on file before the CSLB issues an active license, and before it reactivates an inactive one; a license whose bond is cancelled is suspended on the cancellation date unless a replacement is filed. The bond itself is continuous, while the license renews every two years. The surety bills its premium each year, and some sell two-year terms that match the renewal cycle.</p>
<h2>What it covers and what it does not</h2>
<p>Claims on the license bond come from homeowners who paid for work never performed, from workers with unpaid wages, and from suppliers who were not paid and liened a property. The bond's ${K.usd(r.amount!)} is shared among all claimants, which is small next to a typical remodeling contract, and California law gives homeowners other remedies, including a civil action against the contractor. General liability insurance and workers' compensation are separate requirements, depending on the license class and staff.</p>
<p>For the other states read, see ${h.a('state:contractor:washington', 'Washington')}, which raised its bond in 2024, and the ${h.a('contractor-license-bond', 'contractor bond overview')}.</p>
`,
  faqs: [
    { q: 'What bond does a California contractor need in 2026?', a: `A ${K.usd(r.amount!)} contractor license bond for any active CSLB license, since January 1, 2023. A license qualified by an RME or a minority RMO adds a ${K.usd(r.amount!)} bond of qualifying individual, and an LLC adds a ${K.usd(llc)} employee bond. Inactive licenses need no bond.` },
    { q: 'How much does a $25,000 California contractor bond cost?', a: `With a credit score of 700 or more, about ${K.usd(p(r.amount!).lo)} to ${K.usd(p(r.amount!).hi)} a year on published license bond grids. Between 600 and 649, about ${K.usd(p(r.amount!, 't3').lo)} to ${K.usd(p(r.amount!, 't3').hi)}. Under 550 the published estimate reaches ${K.usd(p(r.amount!, 't5').lo)} to ${K.usd(p(r.amount!, 't5').hi)}, and some sureties decline.` },
    { q: 'When did California raise the contractor bond to $25,000?', a: `On January 1, 2023, under Senate Bill 607. The contractor license bond, the bond of qualifying individual and the disciplinary bond all went from ${K.usd(r.previous!)} to ${K.usd(r.amount!)}. Contractors renewing or reactivating after that date had to file the larger bond.` },
  ],
  related: ['contractor-license-bond', 'state:contractor:washington', 'state:contractor:arizona', 'performance-bond'],
});
