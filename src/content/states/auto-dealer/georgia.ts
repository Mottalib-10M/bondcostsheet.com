import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'auto-dealer', S = 'georgia';
const r = K.R(T, S);
const p = (t: 't1' | 't3' | 't5', y = 1) => K.credit('dealer', t, r.amount!, y);

export default defineState({
  bond: T, slug: S,
  title: 'Georgia Dealer Bond 2026: $35,000 per Location, 2-Year Term',
  description: `Georgia used car dealer bond 2026: ${K.usd(r.amount!)} for each licensed location, expiring September 30 of even years under O.C.G.A. 43-47-8, and the premium by credit.`,
  intro: `Georgia used motor vehicle dealers file a ${K.usd(r.amount!)} bond for each licensed location; the bond runs to September 30 of even-numbered years.`,
  resume: `Georgia licenses used motor vehicle dealers through the Secretary of State's professional licensing boards, and each dealer must file a ${K.usd(r.amount!)} surety bond, under O.C.G.A. 43-47-8 and the board's rules. The bond is per location: a dealer with a second lot files a second ${K.usd(r.amount!)} bond. Georgia licenses and bonds run on a two-year cycle that ends on September 30 of even-numbered years, so a dealer licensed in an odd year buys a bond for less than two years at first. Used motor vehicle parts dealers file a smaller ${K.usd(10000)} bond. The premium depends on the owner's credit: on published dealer grids, about ${K.usd(p('t1').perYear.lo)} to ${K.usd(p('t1').perYear.hi)} a year with a score of 700 or more, ${K.usd(p('t3').perYear.lo)} to ${K.usd(p('t3').perYear.hi)} between 600 and 649, and ${K.usd(p('t5').perYear.lo)} to ${K.usd(p('t5').perYear.hi)} under 550. A two-year term paid at once costs about ${K.dec(K.M.multiYear['2'], 1)} times one year. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>One bond per location</h2>
<p>The Secretary of State's guide for used motor vehicle dealers lists the ${h.cite(T, S, '$35,000 surety bond')} among the license requirements. The board's rules apply it to each licensed location, not to the company as a whole. A dealer that adds a lot adds a bond, written for that address, and the bond must match the location named on the license.</p>
<p>The bond protects buyers and the state when a dealer fails to deliver titles, pay off liens on trade-ins or follow the dealer laws. Claims go to the surety, which pays valid ones up to ${K.usd(r.amount!)} per bond and then recovers from the dealer.</p>
<h2>The even-year calendar</h2>
<p>Georgia dealer licenses expire on September 30 of even-numbered years, and the bonds follow the same calendar. A dealer licensed in the spring of an odd year holds a license for about a year and a half before the first renewal, and many sureties price the first bond to that date. At each renewal, the dealer files a continuation or a new bond for the next two years. Paying for the full cycle at once, at about ${K.dec(K.M.multiYear['2'], 1)} times a yearly premium, gives ${K.usd(p('t1', 2).lo)} to ${K.usd(p('t1', 2).hi)} with good credit.</p>
${h.mini('bond', { t: 'Georgia next to other states', p: ['st', 'cr'], d: { bt: T, lock: 1, st: 'florida', cr: 't3' } })}
<h2>Parts dealers and other licenses</h2>
<p>Used motor vehicle parts dealers, a separate license, file a ${K.usd(10000)} bond. New car dealers holding a manufacturer franchise follow other rules. Dealers who also sell in neighboring states need each state's bond: ${h.a('state:auto-dealer:florida', 'Florida')} asks ${K.usd(K.amt(T, 'florida'))} and ${h.a('state:auto-dealer:north-carolina', 'North Carolina')} ${K.usd(K.amt(T, 'north-carolina'))}. The ${h.a('auto-dealer-bond', 'dealer bond overview')} lists every state read.</p>
<p>Before buying, check that the bond names the business exactly as on the license application, including any trade name, and that it lists the right location. Georgia's board returns applications whose bond and license details disagree, and the delay can push a planned opening date back by several weeks.</p>
`,
  faqs: [
    { q: 'How much is a Georgia used car dealer bond?', a: `${K.usd(r.amount!)} for each licensed location, under O.C.G.A. 43-47-8 and the licensing board's rules. With a credit score of 700 or more, the premium is about ${K.usd(p('t1').perYear.lo)} to ${K.usd(p('t1').perYear.hi)} a year on published dealer grids. Parts dealers file a ${K.usd(10000)} bond.` },
    { q: 'When does a Georgia dealer bond expire?', a: 'On September 30 of even-numbered years, together with the dealer license. A dealer licensed in an odd year holds a shorter first term. At each renewal the dealer files a new bond or a continuation certificate from the surety for the next two-year cycle.' },
    { q: 'Does a Georgia dealer with two lots need two bonds?', a: `Yes. The ${K.usd(r.amount!)} bond applies to each licensed location, so a second lot means a second bond written for that address. Each bond is priced separately by the surety, though a surety that already bonds the first lot often offers the same rate for the second.` },
  ],
  related: ['auto-dealer-bond', 'state:auto-dealer:florida', 'state:auto-dealer:north-carolina', 'bad-credit-surety-bonds'],
});
