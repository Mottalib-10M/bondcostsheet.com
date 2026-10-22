import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'contractor', S = 'washington';
const r = K.R(T, S);
const [gen, spec] = r.variants;
const p = (a: number, t: 't1' | 't3' | 't5' = 't1') => K.credit('license', t, a).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'Washington Contractor Bond 2026: $30,000 and $15,000 Amounts',
  description: `Washington contractor bond 2026: ${K.usd(gen.amount)} for general and ${K.usd(spec.amount)} for specialty contractors since July 1, 2024 (RCW 18.27.040), up from ${K.usd(r.previous!)}, and the premium.`,
  intro: `Washington raised its contractor bonds on July 1, 2024: ${K.usd(gen.amount)} for general and ${K.usd(spec.amount)} for specialty contractors.`,
  resume: `A Washington contractor registers with the Department of Labor and Industries and files a continuous surety bond under RCW 18.27.040. Since July 1, 2024, the department requires "a Washington Continuous Contractor Surety Bond in the amount of $30,000 for general contractors and $15,000 for specialty contractors". Before that date the amounts were ${K.usd(r.previous!)} and $6,000, so both bonds more than doubled at once, and every registered contractor had to raise its bond at its next renewal. Contractors with unpaid final judgments against them can be required to post a larger bond under the department's rules. The bond protects consumers, workers and suppliers against a contractor's failure to meet the registration law or its contracts. The premium follows credit: on published grids, a ${K.usd(gen.amount)} general contractor bond costs about ${K.usd(p(gen.amount).lo)} to ${K.usd(p(gen.amount).hi)} a year with a score of 700 or more, and the ${K.usd(spec.amount)} specialty bond ${K.usd(p(spec.amount).lo)} to ${K.usd(p(spec.amount).hi)}. Rule read on ${K.day(r.read)}.`,
  toolArg: { vr: '0' },
  body: (h) => `
<h2>The 2024 increase</h2>
<p>Washington had kept its contractor bonds at ${K.usd(r.previous!)} and $6,000 for years. The amounts rose on July 1, 2024 to ${h.cite(T, S, `${K.usd(gen.amount)} and ${K.usd(spec.amount)}`)}. Existing contractors moved to the new amounts as their registrations renewed, often through a rider from their surety. Some guides still print the old figures, which no longer allow a contractor to register.</p>
<p>General contractors may take on or supervise work across trades; specialty contractors register for one primary trade, such as roofing, painting or flooring. Electricians and plumbers also hold separate licenses with their own rules.</p>
${h.mini('bond', { t: 'General or specialty: your premium', p: ['vr', 'cr'], d: { bt: T, lock: 1, st: S, vr: '1', cr: 't2' } })}
<h2>A continuous bond</h2>
<p>The Washington bond is continuous: it stays in force until cancelled, and it renews with the registration. A surety that cancels must give notice to the department, and the contractor's registration is suspended if no new bond arrives before the cancellation takes effect. The surety bills a premium each year. The bond amount is the total available for all claims, so a contractor with several unpaid claimants can exhaust it, and the department may then require a new bond.</p>
<h2>Judgments and higher bonds</h2>
<p>Washington's rules let the department require a larger bond from a contractor with unpaid final judgments related to its construction work. A contractor in that position may also face a higher premium or a refusal from sureties. Clearing judgments before renewal keeps both the amount and the rate at the standard level.</p>
<p>Contractors working across the Columbia River should note that ${h.a('state:contractor:oregon', 'Oregon')} sets its own bonds by endorsement. The ${h.a('contractor-license-bond', 'contractor bond overview')} compares all states read.</p>
<p>Washington's registration search shows each contractor's bond and its amount, so a homeowner can confirm that a contractor carries the post-2024 bond before signing. A registration showing a bond below ${K.usd(gen.amount)} for a general contractor, or a cancelled bond, is a reason to ask questions or look elsewhere.</p>
`,
  faqs: [
    { q: 'How much is a Washington contractor bond in 2026?', a: `${K.usd(gen.amount)} for general contractors and ${K.usd(spec.amount)} for specialty contractors, under RCW 18.27.040, since July 1, 2024. The bond is filed with the Department of Labor and Industries and is continuous. With good credit, the general contractor bond costs about ${K.usd(p(gen.amount).lo)} to ${K.usd(p(gen.amount).hi)} a year.` },
    { q: 'What were the Washington contractor bond amounts before July 2024?', a: `${K.usd(r.previous!)} for general contractors and $6,000 for specialty contractors. The 2024 change more than doubled both amounts at once. Contractors registered before the change raised their bonds at renewal, usually with a rider from their surety rather than a new bond.` },
    { q: 'Can Washington require a larger contractor bond?', a: 'Yes. Under the department\'s rules, a contractor with unpaid final judgments related to construction work can be required to post a larger bond before registering or renewing. Sureties may also charge more or decline. Paying or settling the judgments returns the contractor to the standard amount.' },
  ],
  related: ['contractor-license-bond', 'state:contractor:oregon', 'state:contractor:california', 'bad-credit-surety-bonds'],
});
