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

## License

This is coursework. No real business is being represented; all clients,
metrics, and team members are fictional.
