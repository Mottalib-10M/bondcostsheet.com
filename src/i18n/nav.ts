import { route, type Locale } from './routes';
import { GUIDES, guideById, statePageById, STATE_PAGES, stateId } from '../lib/pages';
import { btype, stateName } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Surety bond cost calculator', method: 'Method and sources', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'bonds', label: 'License bonds' },
  { id: 'contract', label: 'Federal, contract and court bonds' },
  { id: 'guides', label: 'Cost and basics' },
];
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const g = guideById(id); if (g) return g.nav;
  const s = statePageById(id); if (s) return `${btype(s.bond).short} bond in ${stateName(s.slug)}`;
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every state page from the footer: one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => STATE_PAGES.map((s) => ({ href: route(stateId(s.bond, s.slug), lang), label: `${btype(s.bond).short}, ${stateName(s.slug)}` }));
