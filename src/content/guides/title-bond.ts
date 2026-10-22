import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const T = 'title';
const tx = K.R(T, 'texas'), ca = K.R(T, 'california'), vt = K.R(T, 'vermont');
const M = K.M.title;
const ex = (v: number, m: number) => ({ amt: Math.round(v * m), prem: K.title(Math.round(v * m)) });
const tx8 = ex(8000, tx.multiplier!), tx20 = ex(20000, tx.multiplier!), ca20 = ex(20000, ca.multiplier!);

export default defineGuide({
  id: 'title-bond', group: 'bonds', order: 6, slug: 'title-bond', bond: T,
  nav: 'Title bond', card: 'Bonded title for a vehicle without a title: the multiple of value each state sets (1.5 times in Texas) and the premium.',
  title: 'Title Bond 2026: Bonded Title Amount by State and the Price',
  description: `Title bond 2026: a lost title needs a bond of 1.5 times the value in Texas and Vermont, 1 times in California. Enter the value for the amount and premium.`,
  h1: 'Title bond: the amount for a vehicle without a title, and its price',
  intro: 'Enter the vehicle value and pick the state: the bond amount the DMV requires and the usual one-time premium appear at once.',
  resume: `A title bond, or bonded title, lets you register a vehicle when you cannot produce a proper title: the seller lost it, never signed it, or the paperwork was incomplete. The DMV issues a title marked as bonded, and the bond protects anyone who later proves a better claim to the vehicle. The amount is a multiple of the vehicle value set by the state. Texas law sets it at one and a half times the value, so an ${K.usd(8000)} car needs a ${K.usd(tx8.amt)} bond. Vermont also uses one and a half times the J.D. Power trade-in value. California asks for the market value itself, and only for vehicles worth ${K.usd(ca.threshold!)} or more. The premium is paid once and is modest: on a published schedule, ${K.usd(M.base)} up to a ${K.usd(M.baseUpTo)} bond and ${K.usd(M.perThousand)} per extra $1,000, so about ${K.usd(tx8.prem)} for that Texas car and ${K.usd(tx20.prem)} for a $20,000 one.`,
  tool: 'bond', toolArg: { bt: T, lock: 1, st: 'texas', vv: 12000 },
  body: (h) => `
<h2>When you need a bonded title</h2>
<p>A state titles a vehicle only when it can trace ownership. If you bought a car with no title, a title signed by the wrong person, or a bill of sale only, the DMV cannot simply issue a clean title in your name. Most states then offer a bonded title: you prove what you can, have the vehicle inspected and valued, buy a surety bond for the amount the state sets, and receive a title branded as bonded. If a previous owner or a lender later proves a claim, they are paid from the bond, and the surety turns to you for repayment.</p>
<p>The brand does not last forever. Vermont converts a bonded title into a regular one after ${K.num(vt.term!)} years without a claim, and Texas and other states follow a similar rule. Until then, the bond must stay in force.</p>
<h2>A multiple of value, not a percentage</h2>
<p>The bond amount is a multiple of the vehicle's value. The Texas DMV states it plainly: the amount "is equal to 1 ½ times the value of the vehicle" (${h.ext(tx.url, 'TxDMV')}). Some agency pages describe it as 1.5 or 2 percent of the value, which mixes up the bond amount with a premium rate; for a $10,000 car the Texas bond is ${K.usd(15000)}, not $150. Vermont uses the same one and a half times, applied to the J.D. Power average trade-in value (${h.ext(vt.url, 'Vermont DMV')}). California sets the bond equal to the market value, the midpoint of a valuation guide or a dealer's written appraisal, and asks for it only from ${K.usd(ca.threshold!)} of value (${h.ext(ca.url, 'California DMV')}).</p>
${h.mini('bond', { t: 'Bond amount and premium for your vehicle', p: ['st', 'vv'], d: { bt: T, lock: 1, st: 'texas', vv: 15000 } })}
<h2>Which value counts</h2>
<p>The state picks the valuation method, not you. Texas looks first at the Standard Presumptive Value it uses for sales tax, then at a NADA guide, then at an appraisal by a licensed dealer or insurance adjuster. Vermont takes the J.D. Power average trade-in. California takes the midpoint of a recognized guide or a written appraisal. A vehicle with heavy damage or missing parts can therefore be valued well below its listing price, which lowers both the bond and the premium.</p>
<h2>What it costs</h2>
<p>Title bonds are cheap because claims are rare and the surety can recover from the vehicle owner. They are usually sold for a one-time premium covering the bond's full term, often without a credit check. On the schedule one agency publishes, a bond up to ${K.usd(M.baseUpTo)} costs ${K.usd(M.base)}, and each extra $1,000 adds ${K.usd(M.perThousand)}. A $20,000 vehicle needs a ${K.usd(tx20.amt)} bond in Texas, about ${K.usd(tx20.prem)}, and a ${K.usd(ca20.amt)} bond in California, about ${K.usd(ca20.prem)}. Prices vary by surety, so treat these as orders of magnitude.</p>
${h.table(['Vehicle value', 'Texas bond (1.5 ×)', 'Texas premium', 'California bond (1 ×)', 'California premium'], [5000, 10000, 20000, 40000].map((v) => { const t = ex(v, tx.multiplier!), c = ex(v, ca.multiplier!); return [K.usd(v), K.usd(t.amt), K.usd(t.prem), v < ca.threshold! ? 'not required' : K.usd(c.amt), v < ca.threshold! ? '' : K.usd(c.prem)]; }), 'Estimated one-time premium on a published title bond schedule', ['r', 'r', 'r', 'r', 'r'])}
<h2>The steps, in order</h2>
<p>Each state has its own sequence, but it usually runs: gather every ownership document you have; get the vehicle inspected, often by a law enforcement officer or a licensed inspector who checks the VIN; obtain the valuation the state requires; apply to the DMV for a determination; buy the bond on the state's form; then file it with the title application. In Texas the DMV sends a notice of the bond amount, and you have one year from it to buy the bond. A vehicle with an open lien less than ten years old cannot get a Texas bonded title without a lien release.</p>
<h2>When a bonded title is not the right route</h2>
<p>If the seller can still sign, a duplicate title from the previous owner is faster and free of any bond. If the vehicle was abandoned on your property, many states use an abandoned vehicle or mechanic's lien procedure instead. And a vehicle reported stolen will not be titled by any of these routes. The state page says which route applies first.</p>
<p>Keep every receipt and letter from the process. If a former owner appears later with a claim, the surety will ask for proof of how you acquired the vehicle, and the bill of sale, the inspection report and the DMV notice are what protect you.</p>
`,
  faqs: [
    { q: 'How much is a title bond in Texas?', a: `The bond amount is one and a half times the vehicle value, so a $12,000 vehicle needs an ${K.usd(18000)} bond. The premium is paid once and is far lower: on a published schedule, about ${K.usd(K.title(18000))} for that bond. The DMV sets the value from the Standard Presumptive Value, a NADA guide or an appraisal.` },
    { q: 'Is the title bond 1.5 percent of the vehicle value?', a: 'No. In Texas and Vermont the bond amount is one and a half times the value, written as 1 ½ times in the Texas rule. A percentage applies to the premium, the price of the bond, not to the bond amount. Pages that print 1.5 percent of value confuse the two figures.' },
    { q: 'How long does a bonded title stay bonded?', a: 'Usually three years. If nobody makes a claim on the bond in that period, the state issues a regular title on request. Vermont states the three-year rule on its bonded title page. Until then the bonded brand stays on the title, and the bond must remain in force.' },
    { q: 'Does California require a title bond for every vehicle?', a: `No. California asks for a bond only when regular proof of ownership is missing and the vehicle is worth ${K.usd(ca.threshold!)} or more. The bond equals the market value, on DMV form REG 5057 with the surety's signature notarized, and a cash deposit can replace it.` },
  ],
  related: ['state:title:texas', 'state:title:california', 'auto-dealer-bond', 'what-is-a-surety-bond', 'license-and-permit-bond'],
  sources: ['bryant_title'],
});
