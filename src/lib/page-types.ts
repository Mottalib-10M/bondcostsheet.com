/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  - a bond or topic page with its calculator: `src/content/guides/<id>.ts` (GuideDef);
 *  - a bond in one state: `src/content/states/<bond type>/<state-slug>.ts` (StateDef).
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** title */ t?: string; /** ids of the fields shown */ p?: string[]; /** default values */ d?: Record<string, number | string>; /** link text */ c?: string }

export interface Helpers extends Kit {
  /** Internal link by page id ("notary-bond", "state:notary:texas", "method"). Unknown id = failed test. */
  a: (id: string, text: string) => string;
  /** Table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2026.json (key), with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to any official URL already read. */
  ext: (url: string, text: string) => string;
  /** The required amount of a bond type in a state, linked to the official page it was read on: cite('notary', 'texas'). */
  cite: (type: string, state: string, text?: string) => string;
  /** A federal rule's official page: fedLink('erisa', 'text'). */
  fedLink: (id: string, text: string) => string;
  /** Ruled note. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator built on a calculator of tool-specs.ts: `${h.mini('bond', { t, p: ['st'], d: { bt: 'notary', lock: 1 } })}`. */
  mini: (kind: string, opts?: MiniOpts) => string;
}

export type Group = 'bonds' | 'contract' | 'guides';

export interface GuideDef {
  id: string; group: Group; order: number;
  /** URL segment, lowercase and dashes, no year. */
  slug: string;
  /** The bond type this page is the hub of (its state pages live under its slug). */
  bond?: string;
  nav: string; card: string;
  /** 50 to 60 characters, key term first, year included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, year included. */
  description: string;
  h1: string; intro: string;
  /** ONE paragraph of 120 words or more: the direct answer with the figures (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  /** Calculator at the top: a key of tool-specs.ts. */
  tool: string;
  /** Default values of that calculator for this page. */
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
}
export const defineGuide = (p: GuideDef): GuideDef => p;

export interface StateDef {
  /** Bond type id (src/data/bonds.json). */
  bond: string;
  /** = file name = state slug ("new-york"). */
  slug: string;
  title: string; description: string; intro: string; resume: string;
  /** Optional H1; default "<Bond> bond in <State>: amount and cost". */
  h1?: string;
  /** Extra defaults of the page calculator (credit tier, license class, vehicle value). */
  toolArg?: Record<string, number | string>;
  body: (h: Helpers) => string;
  faqs: FAQ[];
  related: string[];
}
export const defineState = (s: StateDef): StateDef => s;
