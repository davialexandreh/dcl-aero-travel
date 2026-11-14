// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// SITE_URL e BASE_PATH vêm do deploy (GitHub Pages). Sem eles, vale o domínio próprio.
// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://dclaerotravel.com.br',
  base: process.env.BASE_PATH || '/',
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
