# Writing a page

One page = one file. Routes, menus, sitemap, schemas, llms.txt and internal links read these files alone.

- Bond or topic page: `src/content/guides/<id>.ts` with `defineGuide` (model: `notary-bond.ts`; a hub sets `bond: '<type>'`).
- A bond in one state: `src/content/states/<bond type>/<state-slug>.ts` with `defineState` (model: `states/notary/texas.ts`).
  The state must have a verified record in `src/data/bonds.json`, or the build stops.
- The list of pages the site must have is `src/lib/planned.ts`; links to a planned page are accepted before it exists.

## Figures

Two kinds of figures, never mixed:

- **Required amounts** (legal facts): `data/facts/<type>.json`, one record per state with the amount, the exact
  quote and the official URL (statute, Secretary of State, licensing board, DMV); `data/facts/federal.json` for
  federal rules (eCFR, Department of Labor). `python3 scripts/build-data.py` builds `src/data/bonds.json`.
  A record without a quote or an official URL never reaches a page.
- **Premiums** (estimates): `src/data/params-2026.json > premium`, the envelope of published agency grids for
  each credit tier, with their sources. Always written as an estimate, never as a quote.

Every figure in a text comes from the kit (`src/lib/kit.ts`, documented at its top): `K.R`, `K.amt`, `K.states`,
`K.F`, `K.credit`, `K.notary`, `K.title`, `K.contract`, `K.erisa`, `K.bid`, `K.M`. An amount written in the text is
linked to its official page with `h.cite(type, state)` or `h.fedLink(id, text)`.

## Rules checked by `npx vitest run tests/pages.test.ts` (PAGE_FILES=id1,id2 to test only some)

- title 50 to 60 characters, key term first, 2026, unique; description 150 to 160, 2026, unique;
- `resume`: one paragraph of 120 words or more with the figures (the direct answer);
- body: 650 words of prose for a guide, 300 for a state page, tables apart; at least one `h.mini(...)`;
- 3 to 8 FAQ, answers of 40 to 90 words, questions unique across the site;
- no em or en dash, none of the banned phrases listed in the test; no agency link, no quote form, no affiliate link.

Then `npm run check` (build and every rule of the factory) must end at 0.

## Keeping amounts current

`python3 scripts/update-data.py` rereads every official page and writes `data/verification.json`. An amount no
longer found on its page is reported (exit code 1) and must be read and edited by hand in `data/facts`; the
script never changes an amount itself. The workflow `.github/workflows/deploy.yml` runs it on the 1st of each month.
