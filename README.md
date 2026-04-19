# SWRSWR Portfolio

A static business portfolio for **SWRSWR** — *SchönherrWeberReichert ·
SoftWareResearch* — a (mock) mid-market IT consultancy focused on process
automation and the digitalization of legacy workflows.

This is a student project built to the "Core Four" business-portfolio
brief: Executive Summary, The Team, Case Studies (STAR method), and
Service Catalogue.

## Stack

- [Astro 6](https://astro.build/) — static site generator
- TypeScript (strict)
- MDX via `@astrojs/mdx` — case studies are authored as content files
- `@astrojs/sitemap` — automatic sitemap
- Scoped component CSS (no Tailwind, no UI framework)
- System font stack (no webfonts)

Output: a fully static `dist/` folder, deployable to any static host
(Netlify, Cloudflare Pages, GitHub Pages, S3, etc.).

## Getting started

```bash
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # static production build to ./dist
npm run preview    # preview the production build locally
npm run check      # astro check (types + content schemas)
```

Node 18.17+ is required.

## Project layout

```
src/
├── content.config.ts          # Zod schemas for the three collections
├── content/
│   ├── team/                  # 1 markdown file per partner
│   ├── services/              # 1 markdown file per service
│   └── caseStudies/           # 1 MDX file per case study (STAR format)
├── components/                # Logo, Nav, Footer, cards, StarSection, etc.
├── layouts/
│   ├── BaseLayout.astro       # html/head/meta, nav, footer wrapper
│   └── CaseStudyLayout.astro  # header + metrics strip for /cases/[slug]
├── pages/
│   ├── index.astro            # landing page (hybrid: all sections)
│   ├── 404.astro
│   └── cases/[...slug].astro  # one page per case study (SSG)
└── styles/global.css          # reset + design tokens
```

## Editing content

All copy lives in `src/content/` — you don't need to touch components to
change what the site says.

- **Add a team member** — create a new `.md` file in `src/content/team/`
  with the frontmatter fields listed in `src/content.config.ts` and a short
  bio in the body.
- **Add a service** — create a new `.md` file in `src/content/services/`.
  The `icon` field must be one of `bolt`, `database`, `network`,
  `compass` (inline SVGs live in `src/components/ServiceIcon.astro`).
- **Add a case study** — create a new `.mdx` file in
  `src/content/caseStudies/`. Import `StarSection` at the top:

  ```mdx
  import StarSection from '../../components/StarSection.astro';

  <StarSection label="Situation">…</StarSection>
  <StarSection label="Task">…</StarSection>
  <StarSection label="Action">…</StarSection>
  <StarSection label="Result">…</StarSection>
  ```

  The case study page is generated automatically at
  `/cases/<filename-without-extension>/`.

## Brand identity, in one paragraph

SWRSWR is a three-partner IT consultancy (Schönherr, Weber, Reichert).
Tagline: *Research-grade software. Boardroom-grade delivery.* Tone:
modern, professional, jargon-light. The logo is a custom SVG monogram
that inherits `currentColor` so it adapts to whatever background it sits
on. The palette uses slate neutrals with `#2563eb` (indigo-600) as the
single accent.

## Deploying to GitHub Pages

A ready-to-use workflow lives at
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). It builds the
site on every push to `main` and publishes `dist/` to GitHub Pages.

### One-time setup

1. Push this repository to GitHub.
2. In the repo settings, go to **Settings → Pages → Build and deployment**
   and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The first run takes ~1 minute. Subsequent deploys are incremental.

### The workflow handles three common setups automatically

The workflow computes Astro's `site` and `base` from `GITHUB_REPOSITORY`
and a couple of optional variables, so the same config works for:

| Scenario | Repo name | Served at | `base` |
| --- | --- | --- | --- |
| **Project page** (default) | anything else | `https://<you>.github.io/<repo>/` | `/<repo>` |
| **User / org page** | `<you>.github.io` | `https://<you>.github.io/` | *(none)* |
| **Custom domain** | anything | `https://<your-domain>/` | *(none)* |

For a custom domain, add a repo variable `CUSTOM_DOMAIN` under
**Settings → Secrets and variables → Actions → Variables** (value, e.g.
`swrswr.com`) and drop a `CNAME` file into `public/` containing the same
hostname.

### Running the prod build locally

```bash
# default (treated as a root deploy)
npm run build

# simulate a project-page deploy under /swrswr-portfolio/
SITE=https://you.github.io BASE=/swrswr-portfolio npm run build
npm run preview
```

Internal links are prefixed via a small `withBase()` helper in
[src/utils/url.ts](src/utils/url.ts), so anchors keep working even when
the site is served from a sub-path. A `public/.nojekyll` file is shipped
so GitHub Pages serves Astro's `_astro/` asset directory.

## License

This is coursework. No real business is being represented; all clients,
metrics, and team members are fictional.
