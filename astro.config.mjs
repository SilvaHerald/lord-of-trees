// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
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
          es: 'es-ES',
          fr: 'fr-FR',
          de: 'de-DE',
          ja: 'ja-JP',
          zh: 'zh-CN',
        },
      },
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'es', 'fr', 'de', 'ja', 'zh'],
    routing: {
      prefixDefaultLocale: false, // Don't add /en prefix for English
      redirectToDefaultLocale: true,
    },
    fallback: {
      vi: 'en',
      es: 'en',
      fr: 'en',
      de: 'en',
      ja: 'en',
      zh: 'en',
    },
  },
});
