import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const F = K.F('freight-broker');
const A = F.amount as number;
const r = K.M.classes.freight.rates;
const p = (t: 't1' | 't2' | 't3' | 't4' | 't5') => K.credit('freight', t, A).perYear;

export default defineGuide({
  id: 'freight-broker-bond', group: 'contract', order: 8, slug: 'freight-broker-bond',
  nav: 'Freight broker bond (BMC-84)', card: `The ${K.usd(A)} BMC-84 bond every property broker files with FMCSA, the 2026 suspension rule and the premium by credit.`,
  title: 'Freight Broker Bond 2026: $75,000 BMC-84 Cost by Credit',
  description: `Freight broker bond 2026: FMCSA requires ${K.usd(A)} on form BMC-84 or a BMC-85 trust, the January 2026 suspension rule, and the yearly premium by credit score.`,
  h1: 'Freight broker bond: the $75,000 BMC-84 and what it costs you',
  intro: 'Pick your credit score: the yearly premium range for the federal freight broker bond appears at once, with the rule that sets its amount.',
  resume: `Every property broker and freight forwarder registered with the Federal Motor Carrier Safety Administration must keep a surety bond or a trust fund of ${K.usd(A)}, under 49 CFR 387.307. The bond is filed on form BMC-84; a trust fund held by a financial institution is filed on form BMC-85. The amount is the same in every state and has been since 2013. What changed is enforcement: under the amended rule in force since January 16, 2026, FMCSA can suspend a broker whose available security falls below ${K.usd(A)} after a claim is paid. Because unpaid carriers claim often, sureties rate these bonds higher than ordinary license bonds. Published grids give ${K.dec(r.t1[0], 2)} to ${K.dec(r.t1[1], 0)} percent a year with a credit score of 700 or more, ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)}, and up to ${K.usd(p('t5').lo)} to ${K.usd(p('t5').hi)} under 550.`,
  tool: 'bond', toolArg: { bt: 'freight', lock: 1, cr: 't2' },
  body: (h) => `
<h2>What the rule says</h2>
<p>The regulation is short: "A broker must have a surety bond or trust fund of $75,000 in effect" (${h.fedLink('freight-broker', '49 CFR 387.307')}). Freight forwarders that arrange truck transportation fall under the same requirement. The broker authority is not activated until the bond or trust is on file, and FMCSA revokes the authority if the security lapses. The amount does not vary by state, by volume or by the number of loads, which makes it different from almost every other commercial bond.</p>
<p>Who can claim? Motor carriers and shippers that the broker failed to pay, under the contracts the broker arranged. A carrier that hauled a load and was not paid can file a claim against the bond; the surety investigates, pays valid claims up to ${K.usd(A)} in total, and recovers from the broker.</p>
<h2>The 2026 change</h2>
<p>For years, a bond could be drained by claims without consequence until the surety cancelled it. The amended rules, applicable from January 16, 2026, require the surety or trust provider to notify FMCSA when the security falls below the required amount, and allow FMCSA to suspend the broker's registration until the full ${K.usd(A)} is restored. A broker who lets claims pile up now risks losing the right to operate, not only the bond. The same rules tighten how trust funds must be held and how claims are handled after a broker's bankruptcy.</p>
${h.mini('bond', { t: 'BMC-84 premium for your credit score', p: ['cr'], d: { bt: 'freight', lock: 1, cr: 't3' } })}
<h2>What it costs</h2>
<p>Freight broker bonds are among the most expensive license bonds per dollar of coverage, because claims from carriers are frequent and some brokers fail with many unpaid loads. On published grids for this bond:</p>
${h.table(['Credit score', 'Yearly rate', 'Premium a year on $75,000'], K.M.tiers.map((t) => [t.label, `${K.dec(r[t.id][0], 2)} to ${K.dec(r[t.id][1], 0)} %`, `${K.usd(p(t.id).lo)} to ${K.usd(p(t.id).hi)}`]), 'Envelope of published freight broker bond grids, read October 2026', ['l', 'r', 'r'])}
<p>Experience matters almost as much as credit. A broker with years of clean operations and solid financial statements can obtain rates at the low end; a new authority with no track record usually starts at the high end of its credit tier. Unpaid tax liens, past bond claims or an earlier revoked authority can lead to a refusal or to collateral.</p>
<h2>Bond or trust fund</h2>
<p>The BMC-85 trust fund lets a broker deposit ${K.usd(A)} with a financial institution instead of buying a bond. It costs no premium but ties up the full amount, and the trust provider charges its own fee. Under the 2026 rules, trust funds must be held in cash or near-cash assets that can be paid out quickly. Most new brokers choose the bond because a premium of a few thousand dollars is easier to fund than ${K.usd(A)} in cash.</p>
<h2>Keeping the bond</h2>
<p>The BMC-84 is continuous: it stays on file until the surety cancels it, with thirty days' notice to FMCSA. The premium is billed each year. If the surety pays a claim, the broker must repay it and, under the new rules, may need to restore the full amount quickly to avoid suspension. Changing sureties means filing a new BMC-84 before the old one is cancelled, so the authority never lapses.</p>
<p>Freight brokers often confuse this bond with cargo insurance or contingent auto liability. Those protect the broker and the shipper against damage and accidents; the BMC-84 protects only the people the broker must pay. Shippers and carriers increasingly check that a broker's bond is active in FMCSA's registry before booking.</p>
<h2>Getting the bond in place</h2>
<p>A new broker applies for operating authority with FMCSA, then has the surety file the BMC-84 electronically before the authority can become active. The surety will ask for the owners' credit, any prior trucking or brokerage experience, and sometimes business financial statements. Brokers coming out of a carrier or a larger brokerage often get better terms than first-time owners without industry history. Once filed, the bond appears in the FMCSA licensing records, where shippers and carriers can confirm it is active before booking a load with the broker. Keeping that record clean, with no unresolved claims, has become a selling point in itself.</p>
<p>Brokers who also hold carrier authority need separate insurance filings for their trucks; the BMC-84 covers only the brokerage side.</p>
`,
  faqs: [
    { q: 'How much is a freight broker bond?', a: `The bond amount is ${K.usd(A)} for every broker, set by 49 CFR 387.307. The premium depends on credit and experience: about ${K.usd(p('t1').lo)} to ${K.usd(p('t1').hi)} a year with a score of 700 or more on published grids, and ${K.usd(p('t3').lo)} to ${K.usd(p('t3').hi)} between 600 and 649. New brokers usually pay more than established ones.` },
    { q: 'What is the difference between BMC-84 and BMC-85?', a: `BMC-84 is the surety bond form; the broker pays a yearly premium and a surety guarantees the ${K.usd(A)}. BMC-85 is the trust fund form; the broker or a backer deposits the full ${K.usd(A)} with a financial institution. Both satisfy the federal rule, and FMCSA accepts either one on file.` },
    { q: 'Can FMCSA suspend a broker after bond claims?', a: `Yes, since January 16, 2026. The amended rule requires the surety or trust provider to report when the available security drops below ${K.usd(A)}, and FMCSA can suspend the broker's registration until the full amount is restored. Before, the authority was only revoked once the bond was cancelled.` },
    { q: 'Does the freight broker bond amount change by state?', a: `No. It is a federal requirement and the amount is ${K.usd(A)} wherever the broker is based or operates. Some states require separate licenses for other activities, such as household goods moves, but the property broker bond itself is only the federal one.` },
  ],
  related: ['surety-bond-cost', 'bad-credit-surety-bonds', 'erisa-bond', 'what-is-a-surety-bond', 'license-and-permit-bond'],
  sources: ['ecfr_387_307', 'bryant_cost'],
});
