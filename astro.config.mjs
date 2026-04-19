import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Read GitHub-Pages-style deploy values from env so the same config works
// locally and on CI. Set these in `.github/workflows/deploy.yml` or as repo
// variables when deploying to a project page (e.g. https://<user>.github.io/<repo>/).
//
//   SITE  -> full origin, e.g. "https://<user>.github.io"
//   BASE  -> path prefix, e.g. "/<repo>" (leave unset for a user/org page
//            served at the root, or for a custom domain)
const SITE = process.env.SITE || 'https://swrswr.example.com';
const BASE = process.env.BASE || undefined;

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
});
