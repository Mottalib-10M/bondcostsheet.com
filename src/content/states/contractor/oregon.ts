import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'contractor', S = 'oregon';
const r = K.R(T, S);
const v = r.variants;
const p = (a: number, t: 't1' | 't3' = 't1') => K.credit('license', t, a).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'Oregon Contractor Bond 2026: CCB Amounts by Endorsement',
  description: `Oregon contractor bond 2026: CCB amounts since January 1, 2024 from ${K.usd(v[2].amount)} to ${K.usd(v[3].amount)} by endorsement under ORS 701.068, dual endorsements, and premium.`,
  intro: `Oregon sets six contractor bond amounts by endorsement, from ${K.usd(v[2].amount)} for residential limited to ${K.usd(v[3].amount)} for commercial general level 1.`,
  resume: `Oregon's Construction Contractors Board ties the bond to the endorsement a contractor holds, under ORS 701.068 as amended by House Bill 2922 of 2023. Since January 1, 2024, a residential general contractor files ${K.usd(v[0].amount)}, a residential specialty contractor ${K.usd(v[1].amount)}, and a residential limited contractor ${K.usd(v[2].amount)}. Commercial contractors file ${K.usd(v[3].amount)} at general level 1, ${K.usd(v[4].amount)} at specialty level 1, and ${K.usd(v[5].amount)} at level 2. The residential amounts rose by ${K.usd(5000)} each on that date, the board's table showing the residential general bond going from ${K.usd(20000)} to ${K.usd(25000)}. A contractor holding both residential and commercial endorsements posts two bonds. The premium follows the amount and the owner's credit: on published grids, with a score of 700 or more, the ${K.usd(v[0].amount)} residential general bond costs about ${K.usd(p(v[0].amount).lo)} to ${K.usd(p(v[0].amount).hi)} a year, and the ${K.usd(v[3].amount)} commercial bond ${K.usd(p(v[3].amount).lo)} to ${K.usd(p(v[3].amount).hi)}. Rule read on ${K.day(r.read)}.`,
  toolArg: { vr: '0' },
  body: (h) => `
<h2>Six amounts</h2>
${h.table(['Endorsement', 'Bond since 2024', 'Premium a year, credit 700+'], v.map((x) => [x.label, K.usd(x.amount), `${K.usd(p(x.amount).lo)} to ${K.usd(p(x.amount).hi)}`]), 'Oregon CCB bond amounts by endorsement and estimated premium', ['l', 'r', 'r'])}
<p>The board's licensing page (${h.cite(T, S, 'Oregon CCB')}) lists the amounts by endorsement. Residential endorsements cover work on homes and small residential buildings; commercial endorsements cover other structures, with level 1 for larger operations and level 2 for smaller ones. The level depends on the contractor's experience and the size of its work, which the board reviews when it grants the endorsement.</p>
${h.mini('bond', { t: 'Your Oregon endorsement and its premium', p: ['vr', 'cr'], d: { bt: T, lock: 1, st: S, vr: '3', cr: 't2' } })}
<h2>Dual endorsements, two bonds</h2>
<p>A contractor who works on both homes and commercial buildings holds both endorsements and files two bonds, one for each. A residential general contractor with a commercial level 2 endorsement therefore posts ${K.usd(v[0].amount + v[5].amount)} in total, and pays a premium on each. Commercial contractors also face insurance requirements set by level.</p>
<h2>The 2024 change</h2>
<p>House Bill 2922 raised the residential bonds by ${K.usd(5000)} each from January 1, 2024. Contractors renewing after that date filed the new amounts, often by rider. The change follows a regional trend: ${h.a('state:contractor:washington', 'Washington')} more than doubled its bonds six months later. The ${h.a('contractor-license-bond', 'contractor bond overview')} compares every state read.</p>
<h2>Filing with the board</h2>
<p>The bond is filed with the Construction Contractors Board in the exact business name and with the license number the board assigns. Sureties file electronically with the CCB, and the board's license search shows the bond, its amount and its surety to anyone who looks up a contractor. Homeowners are encouraged to check it before signing a contract, which makes an active bond part of a contractor's credibility. If a surety cancels, the contractor has until the cancellation date to file a replacement, or the license is suspended.</p>
<h2>What it costs</h2>
<p>Oregon's residential bonds are small enough that a contractor with good credit pays close to the minimum premium of most sureties. Commercial level 1 bonds, at ${K.usd(v[3].amount)}, cost more and draw a closer look at the business's finances. Contractors with weaker credit pay a larger share of the bond each year; the ${h.a('bad-credit-surety-bonds', 'bad credit page')} shows how far the rate moves between tiers. Past claims paid on an Oregon bond, which the board records, also weigh on the price at renewal.</p>
`,
  faqs: [
    { q: 'How much is an Oregon residential contractor bond?', a: `Since January 1, 2024, ${K.usd(v[0].amount)} for a residential general contractor, ${K.usd(v[1].amount)} for a residential specialty contractor and ${K.usd(v[2].amount)} for a residential limited contractor, under ORS 701.068. With good credit, the general bond costs about ${K.usd(p(v[0].amount).lo)} to ${K.usd(p(v[0].amount).hi)} a year on published grids.` },
    { q: 'Do Oregon contractors with residential and commercial endorsements need two bonds?', a: 'Yes. Each endorsement has its own bond, and a contractor holding both posts one for residential work and one for commercial work. The amounts add up, and so do the premiums. The board will not issue or renew an endorsement without its bond on file.' },
    { q: 'What is the Oregon commercial contractor bond?', a: `${K.usd(v[3].amount)} for a commercial general contractor at level 1, ${K.usd(v[4].amount)} for a commercial specialty contractor at level 1, and ${K.usd(v[5].amount)} for commercial general or specialty contractors at level 2. The board sets the level from the contractor's experience and size of work.` },
  ],
  related: ['contractor-license-bond', 'state:contractor:washington', 'state:contractor:california', 'surety-bond-cost'],
});
