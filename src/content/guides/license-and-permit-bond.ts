import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = K.M.classes.license.rates;
const p = (a: number, t: 't1' | 't2' | 't3' | 't4' | 't5' = 't1') => K.credit('license', t, a).perYear;
const dm = K.F('dmepos').amount as number;
const recN = K.TYPES.reduce((a, t) => a + t.states.length, 0);

export default defineGuide({
  id: 'license-and-permit-bond', group: 'bonds', order: 7, slug: 'license-and-permit-bond',
  nav: 'License and permit bonds', card: 'Any bond a license or permit requires: where to find the amount, how the premium is set, and what claims look like.',
  title: 'License and Permit Bond 2026: Amounts, Premiums and Claims',
  description: `License and permit bond 2026: where your license sets the amount, the yearly premium for any amount by credit score, the ${K.usd(K.M.minimum)} minimum, and how claims work.`,
  h1: 'License and permit bonds: find the amount, estimate the premium',
  intro: 'Enter the bond amount your license or permit requires and your credit score: the yearly premium range published grids give appears at once.',
  resume: `A license and permit bond is any surety bond that a government requires before it grants a license or a permit: auto dealers, contractors, mortgage brokers, collection agencies, auctioneers, pawnbrokers, sellers of travel, telemarketers, alcohol and tobacco sellers, medical equipment suppliers and hundreds more. The agency that issues the license sets the amount in its statute or rule; this site reads ${recN} such rules for notary, dealer, contractor and title bonds, and the federal ${K.usd(dm)} bond for Medicare equipment suppliers. For any other license, enter the amount your agency states. The premium is a yearly percentage of that amount, set mostly by the owner's credit: on published grids, ${K.dec(r.t1[0], 2)} to ${K.dec(r.t1[1], 1)} percent with a score of 700 or more, ${K.dec(r.t3[0], 1)} to ${K.dec(r.t3[1], 0)} percent between 600 and 649. A ${K.usd(20000)} bond therefore costs about ${K.usd(p(20000).lo)} to ${K.usd(p(20000).hi)} a year with good credit, with a minimum of ${K.usd(K.M.minimum)}.`,
  tool: 'bond', toolArg: { bt: 'license', lock: 1, ba: 20000 },
  body: (h) => `
<h2>Why governments require them</h2>
<p>A license tells the public that a business may operate. A bond gives the public a way to be paid if the business breaks the rules attached to that license. Instead of running its own fund, the state requires each licensee to find a surety willing to stand behind it. Consumers harmed by fraud, unpaid taxes owed to the state, or customers left without the service they paid for can claim on the bond.</p>
<p>The bond also screens applicants. A surety will not guarantee someone it expects to default, so the bond requirement filters out operators with poor records before the agency even reviews the application.</p>
<h2>Where to find your amount</h2>
<p>The amount is in the law or rule that creates the license, and the agency usually prints it on its application checklist. Search the agency's site for "surety bond" with the license name, or read the bond form, which states the penal sum. Some amounts are fixed, like the ${h.cite('auto-dealer', 'texas', `${K.usd(K.amt('auto-dealer', 'texas'))} Texas dealer bond`)}. Others depend on volume, like Arizona's contractor bonds, or are set case by case, like Nevada's. Federal licenses have federal amounts: ${h.fedLink('dmepos', `${K.usd(dm)} for Medicare equipment suppliers`)}, ${h.fedLink('freight-broker', `${K.usd(K.F('freight-broker').amount)} for freight brokers`)}.</p>
${h.mini('bond', { t: 'Premium for the amount your agency sets', p: ['ba', 'cr'], d: { bt: 'license', lock: 1, ba: 10000, cr: 't2' } })}
<h2>How the premium is set</h2>
<p>Sureties sort license bonds into risk classes. Low-risk bonds, such as many permit bonds for city work or small business licenses, are often sold at a flat price with no credit check. Standard license bonds, the large majority, are rated on the owner's personal credit using the grid below. High-risk bonds, where claims are frequent, start higher regardless of credit.</p>
${h.table(['Credit score', 'Yearly rate', 'On $10,000', 'On $50,000'], K.M.tiers.map((t) => [t.label, `${K.dec(r[t.id][0], 2)} to ${K.dec(r[t.id][1], 1)} %`, `${K.usd(p(10000, t.id).lo)} to ${K.usd(p(10000, t.id).hi)}`, `${K.usd(p(50000, t.id).lo)} to ${K.usd(p(50000, t.id).hi)}`]), `License and permit bonds, envelope of published grids, ${K.usd(K.M.minimum)} minimum premium`, ['l', 'r', 'r', 'r'])}
<h2>Forms and wording</h2>
<p>Agencies are strict about the bond form. Most publish their own, with the exact wording, the obligee's name and the signature blocks; some require notarized signatures or an original with a raised seal. The surety must be licensed in the state, and the bond must carry the power of attorney of the agent who signs for it. A bond on the wrong form or with the wrong name is returned, which delays the license.</p>
<h2>Claims and their cost to you</h2>
<p>A claimant files with the surety, which asks the licensee to respond. The surety pays only claims it finds valid, up to the bond amount, and then seeks reimbursement from the licensee and the indemnitors who signed. A paid claim also makes renewal harder: the surety may raise the rate, demand collateral or decline to renew. Resolving complaints directly with customers before they become bond claims protects both the license and the bond price.</p>
<h2>Several licenses, several bonds</h2>
<p>A business licensed in several states or cities usually needs a bond for each license. A car dealer with lots in two states files two dealer bonds; a contractor working in several cities may add local permit bonds on top of a state license bond. Some agencies accept one blanket bond for several locations; most do not. The ${h.a('surety-bond-cost', 'surety bond cost page')} shows how to estimate several bonds at once by credit tier.</p>
<h2>Common licenses that require a bond</h2>
<p>The list is long and varies by state, but the same trades come back everywhere. Motor vehicle dealers and contractors are bonded in most states. Mortgage brokers, lenders and loan originators post bonds with the state banking or financial regulator, often graded by loan volume. Collection agencies, money transmitters and check cashers are bonded because they hold other people's money. Sellers of travel, health clubs and private schools that take payment in advance are bonded in some states so customers can recover prepayments. Alcohol distributors, fuel distributors and tobacco wholesalers post tax bonds that guarantee the excise taxes they collect. Auctioneers, pawnbrokers, private investigators, employment agencies and telemarketers complete a long list. At the federal level, suppliers of durable medical equipment to Medicare and freight brokers have fixed amounts. Each of these has its own form and amount, set by the agency that issues the license.</p>
`,
  faqs: [
    { q: 'What is a license and permit bond?', a: 'A surety bond that a government requires before it issues a license or a permit. It guarantees that the licensee will follow the laws attached to the license and lets harmed consumers or the state claim if it does not. The agency sets the amount; a surety sells the bond for a yearly premium based mostly on the owner\'s credit.' },
    { q: 'How much does a $20,000 license bond cost per year?', a: `With a credit score of 700 or more, published grids give about ${K.usd(p(20000).lo)} to ${K.usd(p(20000).hi)} a year. Between 600 and 649, about ${K.usd(p(20000, 't3').lo)} to ${K.usd(p(20000, 't3').hi)}. Under 550, ${K.usd(p(20000, 't5').lo)} to ${K.usd(p(20000, 't5').hi)} if a surety accepts the bond. Some low-risk permit bonds sell at a flat price.` },
    { q: 'Can one surety bond cover several licenses?', a: 'Rarely. Each license usually needs its own bond on the agency\'s form, naming that agency as obligee. A few agencies accept a blanket bond for several locations of the same licensee. A business licensed in several states will normally buy a separate bond in each one.' },
  ],
  related: ['surety-bond-cost', 'auto-dealer-bond', 'contractor-license-bond', 'notary-bond', 'bad-credit-surety-bonds'],
  sources: ['bryant_cost', 'sbcalc', 'grit', 'cfr_424_57'],
});
