import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'auto-dealer', S = 'florida';
const r = K.R(T, S);
const p = (t: 't1' | 't3' | 't5') => K.credit('dealer', t, r.amount!).perYear;

export default defineState({
  bond: T, slug: S,
  title: 'Florida Dealer Bond 2026: $25,000 on Form HSMV 86020, Cost',
  description: `Florida dealer bond 2026: ${K.usd(r.amount!)} under section 320.27(10) on FLHSMV form 86020, or a Florida bank letter of credit; about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year with good credit.`,
  intro: `Florida dealers file a ${K.usd(r.amount!)} bond or letter of credit with each license; with good credit the bond costs about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year.`,
  resume: `Florida asks for one of the lower dealer bonds among the states read: ${K.usd(r.amount!)}, under section 320.27(10) of the Florida Statutes. The statute requires "a good and sufficient surety bond or irrevocable letter of credit, executed by the applicant-dealer as principal, in the sum of $25,000". The bond is filed with the Department of Highway Safety and Motor Vehicles on its form HSMV 86020, in the exact wording the state prints, and runs with the one-year license. An irrevocable letter of credit from a Florida bank can replace it. Lower amount means lower premium: on published dealer grids, about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year with a credit score of 700 or more, ${K.usd(p('t3').lo)} to ${K.usd(p('t3').hi)} between 600 and 649, and ${K.usd(p('t5').lo)} to ${K.usd(p('t5').hi)} under 550. Because most markets apply a minimum premium, the cheapest quotes cluster near the bottom of that range. Rule read on ${K.day(r.read)}.`,
  body: (h) => `
<h2>The statute and the form</h2>
<p>Section 320.27(10) sets the security at ${h.cite(T, S)} for each licensed dealer, by surety bond or irrevocable letter of credit. The bond protects buyers and the state against the dealer's failure to deliver titles, pay off trade-in liens or comply with the dealer laws. FLHSMV accepts only its own form, HSMV 86020, and the surety must reproduce its wording without change; agencies that write many Florida dealer bonds use it by default, but check before signing.</p>
<p>The license year runs annually, and so does the bond's premium. Dealers renewing their license confirm that the bond is still in force; a bond cancelled during the year must be replaced before the cancellation date to avoid suspension.</p>
<h2>Letter of credit instead</h2>
<p>A dealer with banking relationships can post an irrevocable letter of credit of ${K.usd(r.amount!)} from a Florida bank instead of a bond. The bank charges a fee and usually blocks the amount against the dealer's credit line or deposits. For most small dealers, a surety bond costs less and leaves the credit line free for inventory.</p>
${h.mini('bond', { t: 'Florida next to other states', p: ['st', 'cr'], d: { bt: T, lock: 1, st: 'georgia', cr: 't2' } })}
<h2>Compared with neighbors</h2>
<p>Florida's ${K.usd(r.amount!)} sits below ${h.a('state:auto-dealer:georgia', 'Georgia')}'s ${K.usd(K.amt(T, 'georgia'))} and half the ${K.usd(50000)} of ${h.a('state:auto-dealer:texas', 'Texas')} or ${h.a('state:auto-dealer:north-carolina', 'North Carolina')}. Dealers who open in more than one state buy a bond in each, on each state's form. The ${h.a('auto-dealer-bond', 'dealer bond overview')} lists all the amounts read.</p>
<h2>Before filing</h2>
<p>Florida's dealer license application asks for more than the bond: a qualifying place of business with posted hours, a pre-licensing course for new owners, and a background check. The bond is usually the last piece, bought once the rest of the file is ready, because the surety writes it in the exact name and address that will appear on the license. If the dealership later moves or changes its name, the surety issues a rider and the department must receive it. A bond that no longer matches the license is a common reason for a renewal to stall.</p>
`,
  faqs: [
    { q: 'How much is a Florida dealer bond?', a: `${K.usd(r.amount!)}, under section 320.27(10) of the Florida Statutes, filed on form HSMV 86020. With a credit score of 700 or more, the premium is about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year on published dealer grids. A Florida bank letter of credit can replace the bond.` },
    { q: 'What form is used for the Florida dealer bond?', a: 'FLHSMV form HSMV 86020, in the exact wording the department prints. The surety completes and signs it, with its power of attorney, and the dealer files it with the license application. A bond written on another form or with altered wording is returned by the department.' },
    { q: 'Can a Florida dealer use a letter of credit instead of a bond?', a: `Yes. The statute accepts an irrevocable letter of credit of ${K.usd(r.amount!)} from a Florida bank. The bank charges a fee and holds the amount against the dealer's credit, so most small dealers find a surety bond cheaper and less restrictive.` },
  ],
  related: ['auto-dealer-bond', 'state:auto-dealer:georgia', 'state:auto-dealer:texas', 'surety-bond-cost'],
});
