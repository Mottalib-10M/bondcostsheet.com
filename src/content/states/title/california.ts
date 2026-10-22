import { defineState } from '../../../lib/page-types';
import { KIT as K } from '../../../lib/kit';

const T = 'title', S = 'california';
const r = K.R(T, S);
const th = r.threshold!;
const p = (v: number) => K.title(Math.round(v * r.multiplier!));

export default defineState({
  bond: T, slug: S,
  title: 'California Title Bond 2026: Market Value Bond, Form REG 5057',
  description: `California title bond 2026: a bond equal to market value when ownership proof is missing on vehicles worth ${K.usd(th)} or more, DMV form REG 5057, the premium.`,
  intro: `California asks for a bond equal to the vehicle's market value when ownership proof is missing and the vehicle is worth ${K.usd(th)} or more.`,
  resume: `In California, a vehicle owner who cannot produce the usual proof of ownership may still register the vehicle by filing a surety bond with the Department of Motor Vehicles, under Vehicle Code sections 4157 and 38050 and title 13 of the California Code of Regulations. The DMV's registration manual states that "the bond must be for an amount equal to the market value of the vehicle", not a multiple of it as in Texas. Market value is the midpoint of a recognized valuation guide, or a licensed dealer's written appraisal when the guide does not apply. The bond is needed only for vehicles worth ${K.usd(th)} or more; below that, the DMV relies on other documents and statements. The bond is filed on DMV form REG 5057, with the surety's signature notarized, and a cash deposit can replace it. On one published schedule, the one-time premium is about ${K.usd(p(8000))} for an ${K.usd(8000)} vehicle and ${K.usd(p(20000))} for ${K.usd(20000)}. Rule read on ${K.day(r.read)}.`,
  toolArg: { vv: 12000 },
  body: (h) => `
<h2>When California asks for a bond</h2>
<p>The DMV's vehicle industry registration procedures manual (${h.cite(T, S, 'California DMV')}) treats the bond as a substitute for missing ownership evidence: a lost title the previous owner cannot replace, an incomplete chain of signatures, a vehicle bought from someone who has since disappeared. For vehicles worth less than ${K.usd(th)}, the DMV accepts other documents, such as a statement of facts, without a bond. At ${K.usd(th)} and above, the bond is the route.</p>
<p>The amount equals the market value: the midpoint of a valuation guide such as those used by dealers, or a licensed dealer's written appraisal for vehicles the guides do not list or that are in unusual condition. California does not apply the one and a half multiple that Texas and Vermont use.</p>
${h.mini('bond', { t: 'California bond for your vehicle value', p: ['vv'], d: { bt: T, lock: 1, st: S, vv: 7000 } })}
<h2>Form, signature and cash option</h2>
<p>The bond is written on DMV form REG 5057, and the surety's signature must be notarized. The DMV returns bonds on other forms. An owner who prefers not to buy a bond can deposit cash with the DMV for the same amount; the deposit is held for the bond period and returned if no claim arises. For a ${K.usd(20000)} vehicle, that means ${K.usd(20000)} of cash tied up against a premium of about ${K.usd(p(20000))}.</p>
<h2>What it costs</h2>
<p>The premium is paid once and is low: claims on title bonds are rare, and the surety can recover from the owner. On one published schedule, a bond up to ${K.usd(K.M.title.baseUpTo)} costs ${K.usd(K.M.title.base)} and each extra ${K.usd(1000)} adds ${K.usd(K.M.title.perThousand)}. Compare with ${h.a('state:title:texas', 'Texas')}, where the same vehicle needs a bond one and a half times larger, or read the ${h.a('title-bond', 'title bond overview')}.</p>
<p>Before buying the bond, gather what the DMV will ask with it: the application for title, any bill of sale or receipt, a statement of facts explaining how you acquired the vehicle, a vehicle verification by an authorized officer, and the valuation document. A complete file avoids a second trip and a second notarized form.</p>
`,
  faqs: [
    { q: 'How much is a California title bond?', a: `The bond equals the vehicle's market value, for vehicles worth ${K.usd(th)} or more when the usual ownership proof is missing. The premium is paid once: on one published schedule, about ${K.usd(p(8000))} for an ${K.usd(8000)} vehicle and ${K.usd(p(20000))} for a ${K.usd(20000)} vehicle. A cash deposit can replace the bond.` },
    { q: 'Is a title bond needed in California for a cheap car?', a: `Not below ${K.usd(th)} of market value. For those vehicles the DMV accepts other evidence, such as a signed statement of facts about how the vehicle was acquired. At ${K.usd(th)} and above, the bond on form REG 5057 is required when regular proof of ownership is missing.` },
    { q: 'How does California value a vehicle for a title bond?', a: 'It uses the market value: the midpoint of a recognized valuation guide, or a licensed dealer\'s written appraisal when the guide does not fit the vehicle, for example because of its age, condition or modifications. The bond amount equals that value, without a multiple.' },
  ],
  related: ['title-bond', 'state:title:texas', 'state:auto-dealer:california', 'what-is-a-surety-bond'],
});
