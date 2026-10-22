/** llms.txt (RECETTE §21), generated from the page registry. */
import { GUIDES, STATE_PAGES, stateId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS, label } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> What a surety bond costs in the United States and how much bond the law requires. For notary, auto dealer, contractor license and title bonds, the site reads the required amount in each state on the statute, the licensing agency or the DMV page and links it; for federal bonds (freight broker BMC-84, ERISA, Miller Act performance and payment, bid guarantees) it reads eCFR and the Department of Labor. Premiums are estimates from published rate grids, shown as ranges by credit score with their method. Independent site published by Radif Partners; no quote form, no agency link. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## Bonds state by state', ...STATE_PAGES.map((s) => `- [${label(stateId(s.bond, s.slug))}](${SITE_URL}${route(stateId(s.bond, s.slug), 'en')}): ${s.intro}`), '',
    '## About', `- [How amounts and premiums are built](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
