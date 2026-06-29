import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://plusvending.it',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      // Esclude la thank-you page post-form: non va indicizzata
      filter: (page) => page !== 'https://plusvending.it/grazie/',
    }),
  ]
});