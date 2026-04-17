import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://swrswr.example.com',
  output: 'static',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
});
