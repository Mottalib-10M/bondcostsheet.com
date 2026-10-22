/** Registry: every file of src/content/guides and src/content/states/<bond>/ is loaded here. */
import type { GuideDef, StateDef } from './page-types';
import { hasRec } from './data';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: GuideDef }>(['../content/guides/*.ts', '!../content/guides/_*.ts'], { eager: true });
export const GUIDES: GuideDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const guideById = (id: string) => GUIDES.find((p) => p.id === id);
/** The hub page of a bond type. */
export const hubOf = (bond: string) => GUIDES.find((p) => p.bond === bond);

const s = import.meta.glob<{ default: StateDef }>(['../content/states/*/*.ts', '!../content/states/*/_*.ts'], { eager: true });
export const STATE_PAGES: StateDef[] = Object.entries(s).map(([f, m]) => {
  const parts = f.split('/');
  if (m.default.slug !== base(f)) throw new Error(`${f}: slug "${m.default.slug}" differs from the file name`);
  if (m.default.bond !== parts[parts.length - 2]) throw new Error(`${f}: bond "${m.default.bond}" differs from the folder`);
  if (!hasRec(m.default.bond, m.default.slug)) throw new Error(`${f}: ${m.default.bond} not verified in ${m.default.slug}`);
  return m.default;
}).sort((a, b) => a.bond.localeCompare(b.bond) || a.slug.localeCompare(b.slug));
export const stateId = (bond: string, slug: string) => `state:${bond}:${slug}`;
export const statePageById = (id: string) => STATE_PAGES.find((p) => stateId(p.bond, p.slug) === id);
/** First guide that carries a calculator: the target of a mini-simulator's link. */
export const pageOfTool = (kind: string) => GUIDES.find((p) => p.tool === kind)?.id;
