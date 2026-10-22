import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = K.M.classes.court.rates;
const p = (a: number, t: 't1' | 't2' | 't3' | 't4' | 't5' = 't1') => K.credit('court', t, a).perYear;

export default defineGuide({
  id: 'probate-bond', group: 'contract', order: 13, slug: 'probate-bond',
  nav: 'Probate bond', card: 'The bond a court sets for an executor, administrator or guardian: how the amount is chosen, when it is waived, the premium.',
  title: 'Probate Bond 2026: Executor Bond Amount, Waiver and Premium',
  description: 'Probate bond 2026: how a court sets the executor or administrator bond, when a will can waive it, and the yearly premium by credit score for any amount.',
  h1: 'Probate bond: how the court sets it and what an executor pays',
  intro: 'Enter the bond amount the court ordered and your credit score: the estimated yearly premium, usually paid by the estate, appears at once.',
  resume: `A probate bond, also called a fiduciary or executor bond, guarantees that the person managing an estate, a guardianship or a conservatorship will do so honestly and as the court orders. If the executor steals, mismanages or pays the wrong people, the heirs or creditors can recover from the bond. The court sets the amount, usually from the value of the personal property and the yearly income the fiduciary will control, sometimes with a margin; real estate the executor cannot sell without court approval is often left out. A will can waive the bond, and many do, but the court may still require one, especially when the executor lives in another state or heirs object. Court bonds carry low rates because the court supervises the fiduciary: on published grids, ${K.dec(r.t1[0], 1)} to ${K.dec(r.t1[1], 1)} percent a year with a credit score of 700 or more, so about ${K.usd(p(250000).lo)} to ${K.usd(p(250000).hi)} a year on a ${K.usd(250000)} bond. The premium is generally an expense of the estate, not of the executor personally.`,
  tool: 'bond', toolArg: { bt: 'probate', lock: 1, ba: 250000 },
  body: (h) => `
<h2>Who needs a probate bond</h2>
<p>When someone dies, a court appoints a personal representative to collect the assets, pay the debts and distribute what is left. The person named in the will is called the executor; when there is no will, the court appoints an administrator. Courts also appoint guardians for minors and conservators for adults who cannot manage their affairs. In each case, the person controls money that belongs to others, and the court can require a bond to protect those others.</p>
<p>The bond names the court, or the state on behalf of the beneficiaries, as obligee. A beneficiary or creditor who proves a loss caused by the fiduciary can be paid from it, and the surety then recovers from the fiduciary personally.</p>
<h2>How the court sets the amount</h2>
<p>There is no national figure: each state's probate code sets the rule and each judge applies it. The common approach is the value of the personal property, cash, investments and vehicles, plus a year's expected income from the estate. Real estate is often left out when the fiduciary cannot sell it without court permission. Some states add a percentage margin, and many let the court reduce the bond when assets are placed in a blocked account that cannot be withdrawn without court order. Because the amount comes from the court order, this site does not list amounts by state; enter the figure in your order.</p>
${h.mini('bond', { t: 'Premium for the bond your court ordered', p: ['ba', 'cr'], d: { bt: 'probate', lock: 1, ba: 120000, cr: 't2' } })}
<h2>When the bond is waived</h2>
<p>A will can say that the executor serves "without bond", and courts generally respect that wish. When all heirs are adults and agree in writing, many courts also waive the bond for an administrator. Courts may still require a bond despite a waiver, for instance when the executor lives out of state, has poor credit or a conflict with the heirs, or when a creditor asks for protection. Guardians of minors' money are usually bonded whatever the family wishes.</p>
<h2>What it costs</h2>
<p>Court bonds are priced low because the fiduciary reports to a judge and claims are rare. On published grids:</p>
${h.table(['Credit score', 'Yearly rate', 'On $100,000', 'On $500,000'], K.M.tiers.map((t) => [t.label, `${K.dec(r[t.id][0], 1)} to ${K.dec(r[t.id][1], 1)} %`, `${K.usd(p(100000, t.id).lo)} to ${K.usd(p(100000, t.id).hi)}`, `${K.usd(p(500000, t.id).lo)} to ${K.usd(p(500000, t.id).hi)}`]), 'Probate and fiduciary bonds, envelope of published grids', ['l', 'r', 'r', 'r'])}
<p>The premium renews each year until the court discharges the fiduciary, so an estate that takes three years to close pays three premiums. The premium is normally reimbursed from the estate as an administration expense. Sureties check the fiduciary's credit and may ask for the will, the court order and an inventory; executors with weak credit can still be bonded through some programs at higher rates, or the court may accept a blocked account instead.</p>
<h2>Closing the bond</h2>
<p>The bond ends when the court approves the final accounting and discharges the fiduciary, or when it reduces the bond after assets are distributed. Send the discharge order to the surety; until then, the bond stays active and premiums keep coming. Keeping clear records of every receipt and payment from day one makes the final accounting faster, and an early close saves the estate premiums.</p>
<h2>Other court bonds</h2>
<p>Courts also require appeal bonds, so that a party appealing a money judgment can pay it if it loses, and injunction or replevin bonds, which protect the other side if a temporary order turns out to be wrong. Those are priced very differently, often with full collateral for appeal bonds, and are outside this calculator. For the mechanics shared by all surety bonds, see ${h.a('what-is-a-surety-bond', 'what a surety bond is')}.</p>
<p>A family that wants to avoid the bond entirely can plan ahead: a will that waives it, or assets held in a living trust that passes outside probate, mean no court bond is needed for those assets. Trustees of a living trust are generally not bonded unless the trust document or a court requires it.</p>
<p>An executor named in a will who finds the bond too costly or impossible to obtain can decline to serve, and the court will appoint someone else. Asking the court to reduce the bond by blocking accounts is often the better first step.</p>
`,
  faqs: [
    { q: 'How much does a probate bond cost?', a: `With good credit, published grids give about ${K.dec(r.t1[0], 1)} to ${K.dec(r.t1[1], 1)} percent of the bond amount a year, so ${K.usd(p(100000).lo)} to ${K.usd(p(100000).hi)} on a ${K.usd(100000)} bond, with a minimum near ${K.usd(K.M.minimum)}. The premium renews yearly until the court discharges the fiduciary, and the estate usually pays it as an administration expense.` },
    { q: 'Can a will waive the executor bond?', a: 'Yes, a will can say the executor serves without bond, and courts usually follow it. A court can still order a bond, for example when the executor lives in another state, when heirs object, or when creditors need protection. Without a will, many courts waive the bond if all adult heirs consent in writing.' },
    { q: 'Who sets the amount of a probate bond?', a: 'The judge, under the state probate code. The usual base is the value of the personal property the fiduciary will control plus a year of estate income; real estate is often excluded when it cannot be sold without court approval. Placing assets in a blocked account can lower the bond. The amount appears in the court order.' },
  ],
  related: ['erisa-bond', 'what-is-a-surety-bond', 'surety-bond-cost', 'bad-credit-surety-bonds'],
  sources: ['sbcalc'],
});
