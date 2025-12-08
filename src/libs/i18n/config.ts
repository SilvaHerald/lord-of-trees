import { en } from './locales/en/en';
import { vi } from './locales/vi/vi';

export const languages = {
  en: 'English',
  vi: 'Tiếng Việt',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const ui = {
  en,
  vi,
} as const;

export type EnMessageKey = NestedKeyOf<typeof en>;

function getNested(obj: any, path: string): unknown {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

// Helper function to get translation
export function useTranslations(lang: Language) {
  return function t(key: EnMessageKey, params?: Record<string, string | number>): string {
    const raw =
      (getNested(ui[lang], key) as string | undefined) ??
      (getNested(ui[defaultLang], key) as string | undefined); // fallback

    if (typeof raw !== 'string') return '';

    if (!params) return raw;

    return raw.replace(/\{(\w+)\}/g, (_, name) =>
      name in params ? String(params[name]) : `{${name}}`
    );
  };
}

// Helper to get localized path
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

// Helper to extract language from URL
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

// Helper to remove language prefix from path
export function removeLanguagePrefix(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && segments[0] in languages) {
    segments.shift();
  }
  return '/' + segments.join('/');
}

// ----- DATE HELPER -----
export function convertDateToLanguageFormat(date: Date, language: Language) {
  let locale = 'en-US';

  switch (language) {
    case 'en':
      break;
    case 'vi':
      locale = 'vi';
      break;
    default:
      break;
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
