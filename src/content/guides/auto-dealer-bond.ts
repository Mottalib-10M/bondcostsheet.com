import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const T = 'auto-dealer';
const all = K.states(T);
const amts = all.map((r) => K.amt(T, r.slug)).filter((x) => x > 0);
const med = K.median(amts);
const tx = K.R(T, 'texas'), ny = K.R(T, 'new-york'), nc = K.R(T, 'north-carolina'), wa = K.R(T, 'washington');
const p = (t: 't1' | 't2' | 't3' | 't4' | 't5', a = 50000) => K.credit('dealer', t, a).perYear;

export default defineGuide({
  id: 'auto-dealer-bond', group: 'bonds', order: 5, slug: 'auto-dealer-bond', bond: T,
  nav: 'Auto dealer bond', card: 'Motor vehicle dealer bond amounts in each state read, from $25,000 to $100,000, and the yearly premium by credit score.',
  title: 'Auto Dealer Bond 2026: Amount by State and Premium by Credit',
  description: `Auto dealer bond 2026: the motor vehicle dealer bond in ${all.length} states read on the statute, median ${K.usd(med)}, New York tiers by sales, and the premium for your credit.`,
  h1: 'Auto dealer bond: how much your state requires and what it costs',
  intro: 'Choose the state and the dealer type: the bond the DMV or dealer board requires appears with its statute, and the premium range for your credit score.',
  resume: `A motor vehicle dealer bond protects car buyers and the state if a dealer fails to transfer titles, pay off trade-in liens, remit taxes or honor a sale. Every state read for this page requires one of used car dealers, and the amount is set in the statute. Across the ${all.length} states read, the median is ${K.usd(med)}: ${K.usd(Math.min(...amts.filter((x) => x >= 20000)))} for small New York used dealers, ${K.usd(K.amt(T, 'florida'))} in Florida, ${K.usd(K.amt(T, 'georgia'))} in Georgia, ${K.usd(K.amt(T, 'texas'))} in Texas, California, Illinois, North Carolina and Virginia, and up to ${K.usd(Math.max(...amts))} for New York used dealers that sold more than 50 vehicles the year before. On published dealer grids, a ${K.usd(50000)} bond costs about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year with a credit score of 700 or more, ${K.usd(p('t3').lo)} to ${K.usd(p('t3').hi)} between 600 and 649, and ${K.usd(p('t5').lo)} to ${K.usd(p('t5').hi)} under 550.`,
  tool: 'bond', toolArg: { bt: T, lock: 1, st: 'texas' },
  body: (h) => `
<h2>Why dealers are bonded</h2>
<p>A car sale moves money and paper that the buyer cannot check on the spot: the title, the payoff of a trade-in loan, the sales tax and registration fees the dealer collects for the state. When a dealer closes without completing those steps, buyers are left with cars they cannot register and loans they did not know were still open. The dealer bond gives them, and the state, someone to claim against. The surety pays valid claims up to the bond amount and then recovers the money from the dealer and its owners.</p>
<p>Claims are not rare, which is why sureties underwrite dealer bonds carefully and why dealer rates rise faster than other license bond rates as credit weakens.</p>
<h2>The amounts in the states read</h2>
<p>Most states set one amount per license. California requires ${h.cite(T, 'california')} on DMV form OL 25, and a cash deposit can replace it. Texas has required ${h.cite(T, 'texas')} of independent dealers since September 1, 2021, when House Bill 3533 doubled the earlier ${K.usd(tx.previous!)}; franchised dealers are exempt. Florida asks ${h.cite(T, 'florida')} on its own form, Georgia ${h.cite(T, 'georgia')} for each used dealer location, Illinois ${h.cite(T, 'illinois')} per location, and Virginia ${h.cite(T, 'virginia')} for the first three years of operation only.</p>
<p>Some states vary the amount. New York grades it by dealer type and volume: ${K.usd(ny.variants[0].amount)} for used or wholesale dealers with 50 or fewer sales last year, ${K.usd(ny.variants[1].amount)} for franchised new car dealers, and ${K.usd(ny.variants[2].amount)} for used dealers above 50 sales. North Carolina asks ${K.usd(nc.variants[0].amount)} for the first established salesroom and ${K.usd(nc.variants[1].amount)} more for each additional one. Washington sets ${K.usd(wa.variants[0].amount)} for motor vehicle dealers and ${K.usd(wa.variants[1].amount)} for miscellaneous dealers, per business location.</p>
${h.mini('compare', { t: 'Dealer bond amounts and premiums, state by state', p: ['cr'], d: { bt: T, lock: 1, cr: 't2' } })}
<h2>What a dealer bond costs</h2>
<p>The premium is a yearly rate on the bond amount, priced on the personal credit of the owners. The envelope of published dealer grids gives ${K.dec(K.M.classes.dealer.rates.t1[0], 2)} to ${K.dec(K.M.classes.dealer.rates.t1[1], 1)} percent a year with a score of 700 or more, so ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} for a ${K.usd(50000)} bond. Between 550 and 599 it reaches ${K.dec(K.M.classes.dealer.rates.t4[0], 0)} to ${K.dec(K.M.classes.dealer.rates.t4[1], 1)} percent, ${K.usd(p('t4').lo)} to ${K.usd(p('t4').hi)}. A new dealer with no history in the trade usually pays more than an established one with the same score.</p>
${h.mini('bond', { t: 'Your dealer bond premium', p: ['st', 'cr'], d: { bt: T, lock: 1, st: 'florida', cr: 't3' } })}
<h2>Term, filing and locations</h2>
<p>The bond follows the license. Texas dealer licenses and bonds run two years; Florida's one year; Georgia's expire on September 30 of even years. Several states, Georgia, Illinois and Washington among them, require a separate bond for each licensed location, so a dealer with three lots buys three bonds. Each state prints its own form, and the bond must use its exact wording. A letter of credit or cash deposit is accepted in some states, California and Florida among them, but it ties up the full amount instead of a premium.</p>
<h2>Who does not need one</h2>
<p>Exemptions vary. Texas exempts franchised dealers and trailer-only licenses. California lets wholesale-only dealers selling fewer than 25 vehicles a year claim an exemption. New York exempts dealers of trailers, motorcycles, heavy vehicles, boats and snowmobiles. Virginia's requirement ends after three consecutive years of operation, and claims above the bond go to its recovery fund. Check the state page before buying.</p>
<h2>New dealers and the first bond</h2>
<p>A first dealer bond is often the hardest to place. The surety sees no track record, a new business without financial statements, and an owner whose personal credit carries the whole file. Expect questions about experience in car sales, the source of the money for inventory, and any past licenses held in another state. Owners with scores above 700 and some years in the trade usually get standard rates; others may be offered a higher rate for the first term and a re-rate at renewal once the dealership shows a clean year. A dealer who already holds a bond in one state and opens a lot in another usually finds the second bond easier to place, with the same surety.</p>
<h2>When a claim arrives</h2>
<p>Most dealer bond claims come from buyers who never received a title, or lenders whose trade-in payoff was not sent. The surety sends the claim to the dealer and asks for documents. Fixing the problem quickly, by completing the transfer or paying the lien, usually closes the claim without payment. A paid claim must be reimbursed and will weigh on the renewal price.</p>
`,
  faqs: [
    { q: 'How much is an auto dealer bond?', a: `The amount is set by the state, from ${K.usd(K.amt(T, 'florida'))} in Florida to ${K.usd(Math.max(...amts))} for large New York used dealers, with a median of ${K.usd(med)} in the states read. The premium is a share of it: about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year for a ${K.usd(50000)} bond with a credit score of 700 or more.` },
    { q: 'Do franchised new car dealers need a dealer bond?', a: 'It depends on the state. Texas exempts franchised dealers from its $50,000 bond, while New York requires them to post $50,000. Most states that grade bonds do so by dealer type, so a franchised dealer, a used dealer and a wholesaler may each have a different amount. The state page quotes the exact rule.' },
    { q: 'Can a dealer use cash instead of a surety bond?', a: 'In some states. California accepts a cash deposit on form OL 25E, and Florida accepts a $25,000 irrevocable letter of credit from a Florida bank. A cash deposit ties up the whole bond amount for the life of the license, so most dealers prefer to pay a yearly premium for a surety bond.' },
    { q: 'What claims are made on a dealer bond?', a: 'Most often, titles not transferred to buyers, trade-in loans not paid off, sales tax or registration fees collected but not remitted, and odometer or disclosure fraud. The surety pays valid claims up to the bond amount and then recovers from the dealer and the owners who signed the indemnity agreement.' },
  ],
  related: ['state:auto-dealer:texas', 'state:auto-dealer:california', 'state:auto-dealer:new-york', 'surety-bond-cost', 'title-bond'],
  sources: ['bryant_cost'],
});
