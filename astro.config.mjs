// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Deployed as a GitHub Pages *user* site (repo: Sota-42k.github.io), so the
  // site lives at the domain root and `base` stays '/'.
  site: 'https://sota-42k.github.io',
  base: '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
