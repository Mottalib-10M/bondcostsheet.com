import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const T = 'notary';
const all = K.states(T);
const req = all.filter((r) => r.required && r.amount).sort((a, b) => a.amount! - b.amount!);
const none = all.filter((r) => !r.required);
const lo = req[0], hi = req[req.length - 1];
const med = K.median(req.map((r) => r.amount!));
const tenK = req.filter((r) => r.amount === 10000);
const changed = all.filter((r) => r.previous);
const est10 = K.notary(10000), est25 = K.notary(25000), est50 = K.notary(50000);
const names = (xs: Array<{ name: string }>) => xs.length < 2 ? xs.map((x) => x.name).join('') : `${xs.slice(0, -1).map((x) => x.name).join(', ')} and ${xs[xs.length - 1].name}`;
const in8 = K.R(T, 'indiana'), mi = K.R(T, 'michigan');

export default defineGuide({
  id: 'notary-bond', group: 'bonds', order: 3, slug: 'notary-bond', bond: T,
  nav: 'Notary bond', card: 'The bond amount each state sets for a notary commission, read on the statute, and the flat premium it usually costs.',
  title: 'Notary Bond 2026: Amount Required by State and Its Cost',
  description: `Notary bond 2026: from ${K.usd(lo.amount!)} in ${lo.name} to ${K.usd(hi.amount!)} in ${hi.name}, ${req.length} states read on the official statute, the 2026 increases and the flat premium paid once.`,
  h1: 'Notary bond: the amount your state requires, its cost, and which company can issue it',
  intro: 'Choose your state: the bond amount the law sets for a notary appears with its source, and the flat price such a bond usually sells for.',
  resume: `A notary bond is a small surety bond that protects the public, not the notary, against losses caused by the notary's mistakes or misconduct. The state sets the amount. In the ${all.length} states read for this page it ranges from ${K.usd(lo.amount!)} in ${lo.name} to ${K.usd(hi.amount!)} in ${hi.name}, with a median of ${K.usd(med)}; ${tenK.length} states use ${K.usd(10000)}, and ${names(none)} require no bond. The price is low and flat: a bond is sold once for the whole commission, usually without a credit check, for about ${K.usd(est10.lo)} to ${K.usd(est10.hi)} at ${K.usd(10000)} and ${K.usd(est50.lo)} to ${K.usd(est50.hi)} at ${K.usd(50000)}. Two states raised their amount in 2026: Pennsylvania to ${K.usd(K.amt(T, 'pennsylvania'))} and Louisiana to ${K.usd(K.amt(T, 'louisiana'))}. Each amount below links to the statute or Secretary of State page where it was read in October 2026.`,
  tool: 'bond', toolArg: { bt: T, lock: 1, st: 'texas' },
  body: (h) => `
<h2>What a notary bond does, and what it does not</h2>
<p>A notary bond is a three-party contract. The notary is the principal, the state is the obligee, and the surety company guarantees that someone harmed by a faulty notarization can be paid up to the bond amount. If the surety pays, it then turns to the notary for repayment. The bond therefore protects the person who relied on the notarial act, never the notary. A notary who wants protection for themselves buys errors and omissions insurance, a separate policy that most states do not require and that, in Louisiana since 2026, can no longer replace the bond.</p>
<p>The bond is filed with the commission. In Texas it is approved by the Secretary of State and made payable to the governor; in California it is filed with the county clerk along with the oath within thirty days; in Arizona it is bought in duplicate, one copy going to the Secretary of State. Missing that filing deadline voids the commission in several states, so the bond is bought before, not after, the appointment.</p>
<h2>The amounts, state by state</h2>
<p>Most states settled on ${K.usd(10000)}: ${names(tenK)}. Below that, ${lo.name} still asks for ${h.cite(T, lo.slug)}, an amount unchanged for decades, and Arizona and Illinois ${h.cite(T, 'illinois')}. Above it, Florida sets ${h.cite(T, 'florida')}, California ${h.cite(T, 'california')}, and Indiana ${h.cite(T, 'indiana')} for a commission that runs ${K.num(in8.term!)} years. Alabama and Louisiana are at ${K.usd(50000)}, the highest amounts read: Alabama raised its bond from ${K.usd(K.R(T, 'alabama').previous!)} by Act 2023-548, and Louisiana's new rule took effect on ${K.day(K.R(T, 'louisiana').changed!)}.</p>
${h.mini('compare', { t: 'Bond amounts in every state read', p: ['ct'], d: { bt: T } })}
<p>Colorado is the clearest exception: its notary program requires no bond at all, although some notaries buy one voluntarily. Electronic and remote notaries sometimes need more. California asks for a second ${K.usd(15000)} bond for online notarization, Illinois a ${K.usd(25000)} bond on top of the ${K.usd(5000)} one, and Utah a separate bond for remote notaries.</p>
<h2>What the bond costs</h2>
<p>Notary bonds are among the cheapest surety bonds because claims are rare and small. Sureties sell them at a flat price for the whole term instead of a yearly rate, and do not check credit in most cases. Three states publish a figure themselves. Michigan's Department of State says its ${h.cite(T, 'michigan')} bond generally costs $50 to $100. Utah's notary site puts the ${K.usd(5000)} bond at about $50. A 2025 Tennessee report put that state's ${K.usd(10000)} bond at $30 to $55. Across published offers, a ${K.usd(10000)} bond usually costs ${K.usd(est10.lo)} to ${K.usd(est10.hi)} for the whole commission and a ${K.usd(25000)} bond ${K.usd(est25.lo)} to ${K.usd(est25.hi)}.</p>
<p>Bundles change the price you see. Many vendors sell the bond together with a seal, a journal, errors and omissions insurance and filing help, at $100 to $200 or more. Only the bond is required by law in bonded states. Compare the bond line alone before buying a package.</p>
${h.mini('bond', { t: 'Notary bond and premium in your state', p: ['st'], d: { bt: T, lock: 1, st: 'pennsylvania' } })}
<h2>The 2026 changes</h2>
<p>${changed.length} states in our table changed their amount recently. Pennsylvania's increase to ${h.cite(T, 'pennsylvania')} applies to commissions from ${K.day(K.R(T, 'pennsylvania').changed!)}; a notary commissioned before then keeps the ${K.usd(K.R(T, 'pennsylvania').previous!)} bond until renewal. Louisiana now requires a ${h.cite(T, 'louisiana')} bond of every notary, where a ${K.usd(K.R(T, 'louisiana').previous!)} bond or an insurance policy used to be accepted. Indiana moved to ${K.usd(25000)} with its eight-year commissions, and a notary holding an older ${K.usd(5000)} bond keeps it until the commission ends.</p>
<h2>Which company can issue a notary bond</h2>
<p>A notary bond is not bought from the state. The Secretary of State, or the county clerk, receives and files it, but the bond itself is written by a surety company, and the law names the kind of company it accepts. Texas asks for a surety company authorized to do business in Texas; California asks for an admitted surety insurer, which rules out a cash deposit in its place. Most notaries never deal with the surety directly: they buy through a bonding agency or a notary supply vendor that issues the bond on a surety's paper and often files the application too.</p>
<p>Two checks protect you. First, the surety named on the bond form must hold a license from the state's department of insurance, which every state lets you verify online. Second, the form must be the one the state prints, with the exact obligee and amount; a bond on the wrong form is returned and the commission waits. Price differences between vendors come mostly from the extras bundled with the bond, not from the bond itself.</p>
<h2>Term and renewal</h2>
<p>The bond must cover the whole commission, so its term follows the commission: four years in most states, six in Michigan, eight in Indiana. A new bond is bought at each renewal, at the amount in force at that time. That is how increases reach existing notaries: not overnight, but at their next commission. Moving to another state ends the commission in most cases, and the new state's amount then applies.</p>
<p>Before filing, check two details on the state page: who the bond must name as obligee, and whether the state accepts an electronic filing or wants the original with a raised seal. Michigan, for example, exempts attorneys from its separate bond rules in some cases; Texas lets errors and omissions coverage sit alongside the bond but never in its place.</p>
`,
  faqs: [
    { q: 'How much is a notary bond in 2026?', a: `The amount the state requires runs from ${K.usd(lo.amount!)} in ${lo.name} to ${K.usd(hi.amount!)} in ${hi.name}, with ${K.usd(10000)} the most common. The price is far lower: a flat premium for the whole commission, about ${K.usd(est10.lo)} to ${K.usd(est10.hi)} for a ${K.usd(10000)} bond. Michigan's own FAQ quotes $50 to $100 for its bond.` },
    { q: 'Does a notary bond protect the notary?', a: 'No. It protects people harmed by a notarization: the surety pays them up to the bond amount and then asks the notary to repay. A notary who wants protection buys errors and omissions insurance, which covers the notary\'s own liability for honest mistakes. Most states do not require that policy, and it never replaces the bond where a bond is required.' },
    { q: 'Which states do not require a notary bond?', a: `Among the ${all.length} states read for this page, ${names(none)} requires none. Several other states outside our table also have no bond requirement or let an insurance policy take its place. Louisiana used to allow that choice but since February 2026 requires a ${K.usd(50000)} bond of every notary.` },
    { q: 'Who sells notary bonds?', a: 'Surety companies licensed by the state write them, and most notaries buy through a bonding agency or a notary supply vendor acting for one of those sureties. The state office that commissions notaries only files the bond. Before paying, check that the surety on the form is licensed by the state insurance department and that the form is the official one.' },
    { q: 'Is there a credit check for a notary bond?', a: 'Usually not. Because notary bonds are small and claims are rare, sureties sell them at a flat price for the whole term without pulling credit. Larger notary bonds, such as the $50,000 bonds of Alabama and Louisiana, may be reviewed more closely by some sureties, but most still price them at a flat rate.' },
  ],
  related: ['state:notary:texas', 'state:notary:pennsylvania', 'state:notary:louisiana', 'what-is-a-surety-bond', 'surety-bond-cost'],
  sources: ['mi_notary_faq', 'ut_notary', 'tn_tacir'],
});
