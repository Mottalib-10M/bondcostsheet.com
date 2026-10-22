import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'auto-dealer', S = 'texas';
const r = K.R(T, S);
const p = (t: 't1' | 't3' | 't5', y = 1) => K.credit('dealer', t, r.amount!, y);

export default defineState({
  bond: T, slug: S,
  title: 'Texas Dealer Bond 2026: $50,000 GDN Bond, Premium by Credit',
  description: `Texas dealer bond 2026: ${K.usd(r.amount!)} for independent GDN dealers since HB 3533, two-year term, franchised dealers exempt, premium about ${K.usd(p('t1').perYear.lo)} to ${K.usd(p('t1').perYear.hi)} a year.`,
  intro: `Independent Texas dealers file a ${K.usd(r.amount!)} bond with each GDN license, for two years; with good credit it costs about ${K.usd(p('t1').perYear.lo)} to ${K.usd(p('t1').perYear.hi)} a year.`,
  resume: `Texas requires a ${K.usd(r.amount!)} motor vehicle dealer surety bond with every new and renewal application for an independent General Distinguishing Number, the dealer license issued by the Texas Department of Motor Vehicles. The amount doubled from ${K.usd(r.previous!)} when House Bill 3533 took effect on September 1, 2021, and the TxDMV dealer manual states it in one line. Franchised new car dealers and trailer-only licenses are exempt. The GDN, and so the bond, runs two years. The bond protects buyers and the state when a dealer fails to transfer a title, pay off a trade-in lien or remit fees. Its price depends mostly on the owner's credit: on published dealer grids, about ${K.usd(p('t1').perYear.lo)} to ${K.usd(p('t1').perYear.hi)} a year with a score of 700 or more, ${K.usd(p('t3').perYear.lo)} to ${K.usd(p('t3').perYear.hi)} between 600 and 649, and ${K.usd(p('t5').perYear.lo)} to ${K.usd(p('t5').perYear.hi)} under 550. Rule read on ${K.day(r.read)}.`,
  toolArg: { cr: 't1' },
  body: (h) => `
<h2>Who needs the ${K.usd(r.amount!)} bond</h2>
<p>Any independent motor vehicle dealer licensed through a GDN, that is, a used car dealer without a manufacturer franchise, must file it. The TxDMV manual says that "all new and renewal GDN license applications must be submitted with a ${h.cite(T, S, '$50,000 Motor Vehicle Dealer Surety Bond')}". Franchised dealers, whose franchise agreement and separate license carry their own obligations, are exempt, and so are dealers licensed only for trailers or semitrailers. Wholesale dealers selling only to other dealers hold a different license class and should check its rule.</p>
<p>The bond is filed on the state's form, with the dealer's exact legal name and assumed name as they appear on the application. A mismatch between the bond and the license application is a frequent cause of delay.</p>
<h2>Why it doubled in 2021</h2>
<p>For years Texas asked ${K.usd(r.previous!)}. House Bill 3533 raised it to ${K.usd(r.amount!)} from September 1, 2021. The bond amount caps what all claimants together can recover from the surety, so a larger bond means more buyers can be made whole when a dealer fails. It also means a larger premium and a stricter review for owners with weak credit.</p>
${h.mini('credit', { t: 'The Texas dealer bond across credit scores', p: ['cr'], d: { cl: 'dealer', am: 50000, cr: 't2' } })}
<h2>Paying for two years</h2>
<p>Because the license runs two years, many sureties price the Texas dealer bond for the full term in one payment. On the multi-year factor of the grid we read, two years cost about ${K.dec(K.M.multiYear['2'], 1)} times one year: ${K.usd(p('t1', 2).lo)} to ${K.usd(p('t1', 2).hi)} with good credit. Others bill yearly. Compare quotes on the same term. The ${h.a('auto-dealer-bond', 'dealer bond overview')} compares Texas with ${h.a('state:auto-dealer:california', 'California')} and the other states read, and the ${h.a('bad-credit-surety-bonds', 'bad credit page')} explains what dealers with low scores pay.</p>
<p>A dealer who adds a second location in Texas applies for a separate GDN for it, and each GDN carries its own bond, priced separately by the surety.</p>
`,
  faqs: [
    { q: 'How much is a Texas dealer bond?', a: `The bond amount is ${K.usd(r.amount!)} for independent GDN dealers, since September 1, 2021. The premium depends on credit: about ${K.usd(p('t1').perYear.lo)} to ${K.usd(p('t1').perYear.hi)} a year with a score of 700 or more on published dealer grids, and several times more with poor credit. The license and bond run two years.` },
    { q: 'Are franchised dealers exempt from the Texas dealer bond?', a: `Yes. The ${K.usd(r.amount!)} surety bond applies to independent dealers licensed through a General Distinguishing Number. Franchised new vehicle dealers are exempt, and so are dealers licensed only for trailers or semitrailers. Every other independent dealer files the bond with each new and renewal application.` },
    { q: 'When did Texas raise its dealer bond to $50,000?', a: `On September 1, 2021, when House Bill 3533 took effect. The bond had been ${K.usd(r.previous!)}. Dealers renewing after that date had to file the larger bond. Some guides still show the old figure, but every new or renewal GDN application now needs the ${K.usd(r.amount!)} bond.` },
  ],
  related: ['auto-dealer-bond', 'state:auto-dealer:california', 'state:auto-dealer:florida', 'bad-credit-surety-bonds'],
});
