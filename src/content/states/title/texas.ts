import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'title', S = 'texas';
const r = K.R(T, S);
const m = r.multiplier!;
const ex = (v: number) => ({ amt: Math.round(v * m), prem: K.title(Math.round(v * m)) });
const a = ex(6000), b = ex(15000), c = ex(30000);

export default defineState({
  bond: T, slug: S,
  h1: 'Texas bonded title: the bond is 1.5 times the vehicle value',
  title: 'Texas Title Bond 2026: 1.5 Times the Vehicle Value, Cost',
  description: `Texas title bond 2026: the bond equals 1.5 times the vehicle value set by TxDMV (SPV, NADA or appraisal), the one-year window, the lien rule, premium.`,
  intro: `A Texas bonded title needs a surety bond of one and a half times the vehicle value; a ${K.usd(15000)} car means a ${K.usd(b.amt)} bond, priced around ${K.usd(b.prem)}.`,
  resume: `Texas lets the owner of a vehicle without proper title documents obtain a bonded title from the Department of Motor Vehicles, under section 501.053 of the Transportation Code and the department's rules. The DMV states the amount simply: "The amount is equal to 1 ½ times the value of the vehicle." The value is not the owner's guess. TxDMV looks first at the Standard Presumptive Value it uses for sales tax, then at a NADA guide, and accepts an appraisal by a licensed dealer or an insurance adjuster when neither applies. Once the DMV sends its notice, the owner has one year to buy the bond and file it. A vehicle with an open lien less than ten years old needs a release of lien first. The premium is paid once and is small compared with the bond: on one published schedule, about ${K.usd(a.prem)} for a ${K.usd(6000)} vehicle, ${K.usd(b.prem)} for ${K.usd(15000)} and ${K.usd(c.prem)} for ${K.usd(30000)}. Rule read on ${K.day(r.read)}.`,
  toolArg: { vv: 15000 },
  body: (h) => `
<h2>Why 1.5 times, not 1.5 percent</h2>
<p>The TxDMV page on vehicles bought without a title (${h.cite(T, S, 'TxDMV')}) gives the rule in one sentence: the bond "is equal to 1 ½ times the value of the vehicle". Several bond sellers describe the Texas bond as 1.5 percent of value, which confuses the bond amount with the price of the bond. For a ${K.usd(10000)} car, the bond the DMV requires is ${K.usd(Math.round(10000 * m))}. What you pay the surety is a premium on that amount, around ${K.usd(K.title(Math.round(10000 * m)))} on a published schedule.</p>
<p>The multiple protects anyone with a better claim to the vehicle, a former owner or a lender, who might appear after the bonded title is issued. The extra half covers costs beyond the bare value.</p>
${h.mini('bond', { t: 'Texas title bond for your vehicle value', p: ['vv'], d: { bt: T, lock: 1, st: S, vv: 9000 } })}
<h2>The steps in Texas</h2>
<p>An applicant gathers every ownership document available, such as the bill of sale and any prior registration, and applies to the DMV for a determination. The vehicle must be inspected, and its value is set in the order the department uses: Standard Presumptive Value, then a NADA guide, then a dealer or adjuster appraisal. The DMV sends a notice with the bond amount; the applicant then has one year to buy the bond from a surety authorized in Texas and file it with the title application at the county tax office.</p>
<p>Some vehicles cannot get a bonded title this way: one with an open lien less than ten years old, unless the lienholder releases it, and one reported stolen. A vehicle with a valid out-of-state title or a recent salvage history follows other procedures.</p>
<h2>After three years</h2>
<p>The bonded title carries a notation for the term of the bond. Once the period passes without a claim, the owner can obtain a regular title. Selling the vehicle before then is possible; the bond stays attached to the title until it expires. The ${h.a('title-bond', 'title bond overview')} compares Texas with ${h.a('state:title:california', 'California')}, which uses the market value itself, and Vermont, which uses the same multiple.</p>
`,
  faqs: [
    { q: 'How much is a title bond in Texas for a $15,000 car?', a: `The bond amount is one and a half times the value, so ${K.usd(b.amt)} for a ${K.usd(15000)} vehicle. The premium you pay the surety is much lower, around ${K.usd(b.prem)} once on one published schedule. The DMV sets the value from the Standard Presumptive Value, a NADA guide or an appraisal.` },
    { q: 'How long do I have to buy a Texas title bond?', a: 'One year from the notice the Texas DMV sends with the bond amount. Within that year you buy the bond from a surety authorized in Texas and file it with the title application at the county tax office. After the deadline, the process must start again with a new determination.' },
    { q: 'Can I get a Texas bonded title on a vehicle with a lien?', a: 'Not if the lien is less than ten years old, unless the lienholder signs a release. Older liens may be handled within the bonded title process. Vehicles reported stolen cannot get a bonded title, and vehicles with a valid title from another state follow the regular transfer procedure instead.' },
  ],
  related: ['title-bond', 'state:title:california', 'auto-dealer-bond', 'state:auto-dealer:texas'],
});
