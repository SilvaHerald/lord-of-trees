import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  env: {
    schema: {
      PUBLIC_IMAGE_BASE_URL: envField.string({context: "client", access: "public"})
    },
  },
  site: 'https://yourdomain.com',

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  integrations: [
    react(),
    mdx(),
    partytown(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          vi: 'vi-VN',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    routing: {
      prefixDefaultLocale: false, // Don't add /en prefix for English
      redirectToDefaultLocale: false,
    },
  },
});
