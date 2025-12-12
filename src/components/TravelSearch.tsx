import { useEffect, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import { defaultLang, useTranslations, type Language } from '@libs/i18n/config';

export type TravelSearchPost = {
  id: string; // slug
  title: string;
  description?: string;
  tags?: string[];
  destinations?: {
    name: string;
    description?: string;
    lat?: number;
    lng?: number;
  }[];
  country: string; // your data uses `country`
  lang: Language;
  publishDate: Date;
  coverImage?: string;
  tripType?: string;
};

type Props = {
  searchData: TravelSearchPost[];
  /** Control visibility like your old `.hidden` */
  open: boolean;
  /** Called when user presses ESC or clicks backdrop */
  onClose?: () => void;
  /** Optional: limit number of shown results (default 5) */
  limit?: number;
  lang?: Language;
};

function buildStoryUrl(post: TravelSearchPost) {
  // If your slug might include "vi/" prefix sometimes, strip it.
  const slug = post.id.replace(/^[a-z]{2}\//, '');
  return post.lang === 'vi' ? `/vi/stories/${slug}/` : `/stories/${slug}/`;
}

export default function TravelSearch({
  searchData,
  lang = defaultLang,
  open,
  onClose,
  limit = 5,
}: Props) {
  const [query, setQuery] = useState('');
  const [showPanel, setShowPanel] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations(lang);

  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'tags', weight: 1.5 },
        { name: 'destinations', weight: 2 },
        // original script used 'countries' but your data field is 'country'
        { name: 'country', weight: 2 },
        { name: 'tripType', weight: 1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [searchData]);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return fuse
      .search(q)
      .slice(0, limit)
      .map(r => r.item);
  }, [query, fuse, limit]);

  const hasQuery = query.trim().length > 0;
  const noResults = query.trim().length >= 2 && results.length === 0;

  // Focus input when opening
  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPanel(false);
        setQuery('');
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Close results panel when clicking outside input/panel
  useEffect(() => {
    if (!open) return;

    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      const input = inputRef.current;
      const panel = panelRef.current;

      if (!input || !panel) return;
      if (!input.contains(t) && !panel.contains(t)) {
        setShowPanel(false);
      }
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  // Update panel visibility based on query
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setShowPanel(false);
      return;
    }
    setShowPanel(true);
  }, [query]);

  const clear = () => {
    setQuery('');
    setShowPanel(false);
    inputRef.current?.focus();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md transition-all duration-300"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={() => {
          setShowPanel(false);
          setQuery('');
          onClose?.();
        }}
      />

      {/* Center container */}
      <div className="relative top-80 mx-auto w-full max-w-2xl px-4">
        {/* Search input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-gray-400"
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
          </div>

          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="text"
            placeholder={t('search.placeholder')}
            className="w-full rounded-xl border-2 border-gray-300 bg-white py-4 pr-12 pl-12 text-lg text-gray-900 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            autoComplete="off"
          />

          {/* Clear button */}
          <button
            type="button"
            onClick={clear}
            className={`absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${
              hasQuery ? '' : 'hidden'
            }`}
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Results / No results */}
        {(showPanel || noResults) && (
          <div className="relative">
            {/* Results */}
            <div
              ref={panelRef}
              className={`absolute z-50 mt-2 w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800 ${
                showPanel && results.length > 0 ? '' : 'hidden'
              }`}
              id="search-results"
            >
              <div className="max-h-96 overflow-y-auto">
                {results.map(post => (
                  <a
                    key={post.id}
                    href={buildStoryUrl(post)}
                    className="block border-b border-gray-200 px-6 py-4 transition-colors last:border-b-0 hover:bg-orange-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <div className="flex gap-4">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                          loading="lazy"
                        />
                      ) : null}

                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 truncate font-semibold text-gray-900 dark:text-white">
                          {post.title}
                        </h3>

                        {post.description ? (
                          <p className="mb-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                            {post.description}
                          </p>
                        ) : null}

                        {!!post.destinations?.length && (
                          <div className="flex flex-wrap gap-2">
                            {post.destinations.slice(0, 2).map(dest => (
                              <span
                                key={dest.name}
                                className="inline-block rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                              >
                                {dest.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* No results */}
            <div
              className={`absolute z-50 mt-2 w-full rounded-xl border-2 border-gray-200 bg-white p-6 text-center shadow-xl dark:border-gray-700 dark:bg-gray-800 ${
                noResults ? '' : 'hidden'
              }`}
              id="no-results"
            >
              <svg
                className="mx-auto mb-3 h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">
                {t('search.noResult')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Optional: scrollbar styling */}
      <style>{`
        #search-results::-webkit-scrollbar { width: 8px; }
        #search-results::-webkit-scrollbar-track { background: transparent; }
        #search-results::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .dark #search-results::-webkit-scrollbar-thumb { background: #4b5563; }
      `}</style>
    </div>
  );
}
