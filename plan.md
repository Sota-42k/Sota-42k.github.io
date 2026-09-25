# Academic Portfolio — Architecture & Design Decisions

Living record of decisions for this project. Update as decisions change.

## Purpose

A public academic portfolio for Sota Fujii supporting PhD applications: research,
publications, and a downloadable CV. Content-first, fast, and easy to keep current.

## Stack

| Choice | Rationale |
| --- | --- |
| Astro 7 | Static-first, ships ~zero JS for a content site. Content collections model publications/research as validated data rather than hand-written HTML. |
| Tailwind 4 (via `@tailwindcss/vite`) | v4 integrates through the Vite plugin; the legacy `@astrojs/tailwind` integration is not used. |
| TypeScript (`astro/tsconfigs/strict`) | Catches content/prop mistakes at build time. |
| `@astrojs/sitemap` | Search indexing matters for academic discoverability. |

Node `>=22.12.0` required by Astro 7.

## Key decisions

**Content as data, not markup.** Publications and research live as Markdown with Zod-validated
frontmatter (`src/content.config.ts`). A malformed entry fails `npm run check`. This is why the
project has no separate test runner — the schema plus `astro check` is the correctness gate.

**Content Layer API.** Collections use `loader: glob()` (Astro 5+), not the legacy
`src/content/config.ts` + `type: 'content'` form.

**`z` imported from `astro/zod`, not `astro:content`.** The `astro:content` re-export is
deprecated in Astro 7. Zod 4 also deprecates `z.string().url()` in favor of top-level `z.url()`.

**Single source of truth for identity.** Name, email, profile links, CV path, research
interests, and nav items live in `src/lib/site.ts`. Pages never hardcode these.

**Self-authorship is derived, not marked up.** `AUTHOR_SELF` in `src/lib/site.ts` is matched
against each author list so the owner's name is bolded automatically.

**Publication ordering is explicit.** `sortPublications` (`src/lib/publications.ts`) sorts by
year desc, then the manual `order` field (lower first), then title. The `order` field exists so
a main-conference paper can outrank a same-year workshop paper; title is the last tiebreak to
keep builds deterministic. Both the home and publications pages use this one helper.

**Dark mode overrides `:root`, not `@theme`.** Tailwind 4 hoists `@theme` out of media queries,
silently discarding the query. Light values are declared in `@theme`; the dark scheme reassigns
the emitted custom properties inside `@media (prefers-color-scheme: dark) { :root { … } }`.
Do not nest `@theme` in a media query.

**Dates format in UTC.** Frontmatter dates parse as UTC midnight, so `src/lib/dates.ts` formats
with `timeZone: 'UTC'`. Without this, `2026-08-01` renders as July in negative-offset timezones.

**CV is a download, not a page.** Scoped deliberately: the site has Home, Research, and
Publications only. The PDF at `public/cv/Sota_Fujii_CV.pdf` is the complete record, so industry
experience and skills are intentionally not given site sections.

## Deployment

GitHub Pages *user* site. The repo must be named `Sota-42k.github.io` so the site is served at
the domain root — this is why `base: '/'`. A differently-named repo would serve from a subpath
and require changing `base` in `astro.config.mjs`.

`.github/workflows/deploy.yml` builds and deploys on push to `main`. One-time manual step:
**Settings → Pages → Source: GitHub Actions**.

## Open items

- The IJERPH paper has no DOI link yet — add `links.doi` to
  `src/content/publications/birth-outcomes-ijerph.md` once confirmed.
- `public/favicon.svg` is a plain "SF" monogram placeholder.
