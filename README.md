# portfolio-academic

Academic portfolio site for Sota Fujii — research, publications, and CV.

Built with [Astro](https://astro.build) 7, [Tailwind CSS](https://tailwindcss.com) 4, and
TypeScript. Deployed to GitHub Pages at <https://sota-42k.github.io>.

## Requirements

Node `>=22.12.0` (Astro 7 requirement).

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run check` | Type check + validate content schemas (`astro check`) |
| `npm run build` | Build the static site to `dist/` |
| `npm run verify` | `check` then `build` — run before committing |
| `npm run preview` | Serve the built `dist/` locally |

## Adding content

Content lives in Markdown under `src/content/`, validated by the Zod schemas in
`src/content.config.ts`. A malformed entry fails `npm run check`, so the schema is the
contract — there is no separate test suite.

### A publication

Create `src/content/publications/<slug>.md`:

```markdown
---
title: "Paper title"
authors: ["Fujii, S.", "Coauthor, A."]   # "Fujii, S." is bolded automatically
year: 2026
venue: "Conference or journal, volume(issue), pages"
status: "under-review"                   # peer-reviewed | under-review | preprint
links:                                   # all optional
  pdf: "https://..."
  arxiv: "https://..."
  doi: "https://..."
  code: "https://..."
featured: true                           # shows on the home page
---

A short abstract shown beneath the entry.
```

### A research project

Create `src/content/research/<slug>.md`:

```markdown
---
title: "Project title"
institution: "Institution"
role: "Your role"
advisor: "Prof. Name"        # optional
start: 2026-08-01
end: 2026-12-31              # omit while ongoing — renders as "Present"
summary: "One-sentence summary."
tags: ["Topic", "Method"]
---

- Bullet points describing the work
```

### Identity and contact details

Name, email, profile links, research interests, and nav items are centralized in
`src/lib/site.ts`. Change them there, not in individual pages.

### The CV

The served PDF is `public/cv/Sota_Fujii_CV.pdf`. Replace that file to update the download;
the path is referenced once, via `SITE.cv` in `src/lib/site.ts`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages.

**One-time repo setup:**

1. The GitHub repository must be named `Sota-42k.github.io` — this is a Pages *user* site,
   served at the domain root, which is why `base` is `/` in `astro.config.mjs`. Hosting under
   a differently-named repo would serve the site at a subpath and require changing `base`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
