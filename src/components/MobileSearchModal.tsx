import { useEffect, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import type { TravelSearchPost } from './TravelSearch';
import { useTranslations, type Language } from '@libs/i18n/config';

type Props = {
  open: boolean;
  onClose: () => void;
  searchData: TravelSearchPost[];
  lang: Language;
};

function buildStoryUrl(post: TravelSearchPost) {
  const slug = post.id.replace(/^[a-z]{2}\//, '');
  return post.lang === 'vi' ? `/vi/stories/${slug}/` : `/stories/${slug}/`;
}

export default function MobileSearchModalTSX({ open, onClose, searchData, lang }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations(lang);

  const quickFilters = [
    {
      key: 'destinations',
      label: t('mobile.nav.searchPopup.quickFilter.filters.destinations'),
      emoji: '📍',
    },
    { key: 'tags', label: t('mobile.nav.searchPopup.quickFilter.filters.tags'), emoji: '🏷️' },
    {
      key: 'country',
      label: t('mobile.nav.searchPopup.quickFilter.filters.countries'),
      emoji: '🗺️',
    },
  ];
  // lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // focus on open
  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return searchData;
    return searchData.filter(p => {
      const v = (p as any)[activeFilter];
      return Array.isArray(v) ? v.length > 0 : !!v;
    });
  }, [searchData, activeFilter]);

  const fuse = useMemo(() => {
    // Search keys depend on active filter (better relevance on mobile)
    const keys =
      activeFilter === 'destinations'
        ? [
            { name: 'destinations', weight: 3 },
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1 },
          ]
        : activeFilter === 'tags'
          ? [
              { name: 'tags', weight: 3 },
              { name: 'title', weight: 2 },
              { name: 'description', weight: 1 },
            ]
          : activeFilter === 'country'
            ? [
                { name: 'country', weight: 3 },
                { name: 'title', weight: 2 },
                { name: 'description', weight: 1 },
              ]
            : [
                { name: 'title', weight: 3 },
                { name: 'description', weight: 2 },
                { name: 'tags', weight: 1.5 },
                { name: 'destinations', weight: 2 },
                { name: 'country', weight: 2 },
                { name: 'tripType', weight: 1 },
              ];

    return new Fuse(filteredData, {
      keys,
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [filteredData, activeFilter]);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return fuse
      .search(q)
      .slice(0, 20)
      .map(r => r.item);
  }, [query, fuse]);

  const isTyping = query.trim().length >= 2;
  const hasResults = results.length > 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Fullscreen container (mobile) */}
      <div className="relative flex h-full flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('mobile.nav.searchPopup.searchInput.placeholder')}
              className="max-2xs:text-sm flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-500 focus:outline-none dark:text-white dark:placeholder-gray-400"
              autoComplete="off"
            />

            <button
              type="button"
              onClick={() => {
                setQuery('');
                onClose();
              }}
              className="flex-shrink-0 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close search"
            >
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Quick Filters */}
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {t('mobile.nav.searchPopup.quickFilter.title')}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                ✨ {t('mobile.nav.searchPopup.quickFilter.filters.all')}
              </button>

              {quickFilters.map(f => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    activeFilter === f.key
                      ? 'bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {f.emoji} {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3">
            {!isTyping && (
              <div className="py-12 text-center">
                <svg
                  className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="mb-2 text-lg text-gray-500 dark:text-gray-400">
                  {t('mobile.nav.searchPopup.searchResult.text')}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {t('mobile.nav.searchPopup.searchResult.description')}
                </p>
              </div>
            )}

            {isTyping && !hasResults && (
              <div className="py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-orange-500" />
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  {t('mobile.nav.searchPopup.searchResult.searching')}
                </p>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  {t('mobile.nav.searchPopup.searchResult.noResult')}
                </p>
              </div>
            )}

            {hasResults &&
              results.map(post => (
                <a
                  key={post.id}
                  href={buildStoryUrl(post)}
                  className="block rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start gap-3">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-16 w-16 rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </h4>
                      {post.description ? (
                        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                          {post.description}
                        </p>
                      ) : null}

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span
                          key={post.country}
                          className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                        >
                          {post.country}
                        </span>
                        {post.destinations?.slice(0, 1).map(dest => (
                          <span
                            key={dest.name}
                            className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-900/40 dark:text-slate-200"
                          >
                            {dest.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
