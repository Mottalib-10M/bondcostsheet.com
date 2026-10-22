/**
 * The data asset: src/data/bonds.json, built by scripts/build-data.py from data/facts (one record per bond type and
 * state, each amount quoted from the statute, the licensing agency or the DMV, read in October 2026).
 * A state appears for a bond type only when its rule could be read on an official page.
 */
import RAW from '../data/bonds.json';

export interface Variant { label: string; amount: number }
export interface Rec {
  code: string; slug: string; name: string; required: boolean; amount: number | null; variants: Variant[];
  range: [number, number] | null; multiplier: number | null; term: number | null; statute: string | null; note: string;
  quote: string; url: string; read: string; previous: number | null; changed: string | null;
  official: { low: number; high: number; quote: string; url: string } | null; valueBasis: string | null; threshold: number | null;
}
export interface BondType { id: string; label: string; short: string; pricing: string; states: Rec[] }
export interface Fed { statute: string; quote: string; url: string; note: string; [k: string]: unknown }
const D = RAW as unknown as { retrieved: string; types: BondType[]; federal: Record<string, Fed> };
export const TYPES = D.types;
export const FEDERAL = D.federal;
export const RETRIEVED = D.retrieved;
export const TYPE_IDS = TYPES.map((t) => t.id);
export const btype = (id: string) => { const t = TYPES.find((x) => x.id === id); if (!t) throw new Error(`Unknown bond type ${id}`); return t; };
/** States with a verified rule for a type, alphabetical. */
export const statesOf = (id: string) => btype(id).states;
export const recOf = (id: string, slug: string) => { const r = statesOf(id).find((s) => s.slug === slug || s.code === slug); if (!r) throw new Error(`${id}: ${slug} not verified`); return r; };
export const hasRec = (id: string, slug: string) => statesOf(id).some((s) => s.slug === slug || s.code === slug);
export const fed = (id: string) => { const f = FEDERAL[id]; if (!f) throw new Error(`Unknown federal rule ${id}`); return f; };
/** Main amount of a record: the fixed amount, else the first variant, else the low end of the range. */
export const mainAmount = (r: Rec) => r.amount ?? r.variants[0]?.amount ?? r.range?.[0] ?? 0;
export const ALL_STATES = [...new Map(TYPES.flatMap((t) => t.states).map((s) => [s.slug, { slug: s.slug, name: s.name, code: s.code }])).values()].sort((a, b) => a.name.localeCompare(b.name));
export const stateName = (slug: string) => ALL_STATES.find((s) => s.slug === slug || s.code === slug)?.name ?? slug;
