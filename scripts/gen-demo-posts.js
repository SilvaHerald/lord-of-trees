#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, 'src/content/posts/demo');
const COUNT = Number(process.argv[2] ?? 30); // default 30
const START_YEAR = Number(process.argv[3] ?? 2024); // optional

// Pool for variety (filters/search/maps)
const PLACE_POOL = [
  {
    country: 'Vietnam',
    province: 'Ha Giang',
    destinations: [
      { name: 'Dong Van', lat: 23.2785, lng: 105.3356 },
      { name: 'Ma Pi Leng Pass', lat: 23.2737, lng: 105.4446 },
    ],
    cover: { img: '/demo/vietnam/hagiang-cover.jpg', alt: 'Ha Giang mountain road' },
    photos: ['/demo/vietnam/mapileng.jpg', '/demo/vietnam/dongvan.jpg'],
    tags: ['Vietnam', 'Mountains', 'Motorbike', 'Adventure'],
    currency: 'Vietnamese Dong (VND)',
    languagesSpoken: ['Vietnamese'],
  },
  {
    country: 'Vietnam',
    province: 'Da Nang',
    destinations: [
      { name: 'My Khe Beach', lat: 16.0544, lng: 108.2458 },
      { name: 'Ba Na Hills', lat: 15.9953, lng: 107.9969 },
    ],
    cover: { img: '/demo/vietnam/danang-cover.jpg', alt: 'Da Nang coastline at sunset' },
    photos: ['/demo/vietnam/mykhe.jpg'],
    tags: ['Vietnam', 'Beach', 'City', 'Food'],
    currency: 'Vietnamese Dong (VND)',
    languagesSpoken: ['Vietnamese'],
  },
  {
    country: 'Thailand',
    province: 'Chiang Mai',
    destinations: [{ name: 'Doi Suthep', lat: 18.8048, lng: 98.9215 }],
    cover: { img: '/demo/thailand/chiangmai-cover.jpg', alt: 'Temple in Chiang Mai' },
    photos: ['/demo/thailand/doisuthep.jpg'],
    tags: ['Thailand', 'Relax', 'Culture', 'Mountains'],
    currency: 'Thai Baht (THB)',
    languagesSpoken: ['Thai', 'English (tourist areas)'],
  },
  {
    country: 'Indonesia',
    province: 'Bali',
    destinations: [
      { name: 'Ubud', lat: -8.5068977, lng: 115.2622931 },
      { name: 'Mount Batur', lat: -8.2394154, lng: 115.3779603 },
    ],
    cover: { img: '/demo/bali/mount-batur-sunrise-cover.jpg', alt: 'Sunrise over Mount Batur' },
    photos: ['/demo/bali/batur-volcano-hike.jpg', '/demo/bali/ubud-rice.jpg'],
    tags: ['Indonesia', 'Volcano', 'Nature', 'Sunrise'],
    currency: 'Indonesian Rupiah (IDR)',
    languagesSpoken: ['Indonesian (Bahasa Indonesia)', 'English (tourist areas)'],
  },
  {
    country: 'Japan',
    province: 'Kyoto',
    destinations: [
      { name: 'Gion', lat: 35.0037, lng: 135.7788 },
      { name: 'Fushimi Inari', lat: 34.9671, lng: 135.7727 },
    ],
    cover: { img: '/demo/japan/kyoto-cover.jpg', alt: 'Kyoto old streets at dusk' },
    photos: ['/demo/japan/gion.jpg'],
    tags: ['Japan', 'Cultural', 'Temples', 'City'],
    currency: 'Japanese Yen (JPY)',
    languagesSpoken: ['Japanese', 'English (tourist areas)'],
  },
  {
    country: 'France',
    province: 'Île-de-France',
    destinations: [
      { name: 'Montmartre', lat: 48.8867, lng: 2.3431 },
      { name: 'Seine River', lat: 48.8566, lng: 2.3522 },
    ],
    cover: { img: '/demo/france/paris-cover.jpg', alt: 'Paris street café' },
    photos: ['/demo/france/montmartre.jpg'],
    tags: ['France', 'City', 'Photography', 'Food'],
    currency: 'Euro (EUR)',
    languagesSpoken: ['French', 'English (tourist areas)'],
  },
];

// Must match your schema exactly
const TRIP_TYPES = [
  'solo',
  'family',
  'adventure',
  'backpacking',
  'luxury',
  'business',
  'roadTrip',
  'cityBreak',
  'nature',
  'cultural',
  'food',
  'photography',
];
const BUDGETS = ['budget', 'midRange', 'luxury', 'backpacker'];

// Some short title patterns (keeps content small but varied)
const TITLE_PATTERNS = [
  p => `48 Hours in ${p.province}: Quick Highlights`,
  p => `Weekend Notes: ${p.province}, ${p.country}`,
  p => `Short Trip Guide to ${p.province}`,
  p => `${p.province} in ${randPick([2, 3, 4])} Days: A Compact Itinerary`,
  p => `Chasing Light in ${p.province}: Photo Walks & Small Stops`,
];

const pad2 = n => String(n).padStart(2, '0');
const randPick = arr => arr[Math.floor(Math.random() * arr.length)];

const slugify = s =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function dateForIndex(i) {
  // spreads dates across the year in a stable-ish way
  const month = (i % 12) + 1;
  const day = ((i * 7) % 28) + 1;
  return `${START_YEAR}-${pad2(month)}-${pad2(day)}`;
}

function mapCenter(destinations) {
  const withCoords = destinations.filter(
    d => typeof d.lat === 'number' && typeof d.lng === 'number'
  );
  if (withCoords.length === 0) return undefined;

  const lat = withCoords.reduce((a, d) => a + d.lat, 0) / withCoords.length;
  const lng = withCoords.reduce((a, d) => a + d.lng, 0) / withCoords.length;
  return { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) };
}

function ratingsForIndex(i) {
  const clamp = x => Math.max(1, Math.min(5, x));
  return {
    overall: clamp(3 + (i % 3)),
    accommodation: clamp(3 + ((i + 1) % 3)),
    food: clamp(4 + (i % 2)),
    activities: clamp(3 + ((i + 2) % 3)),
    transportation: clamp(3 + ((i + 3) % 3)),
    safety: clamp(4 + ((i + 4) % 2)),
  };
}

function buildFrontmatter(i) {
  const place = PLACE_POOL[i % PLACE_POOL.length];

  const tripType = TRIP_TYPES[i % TRIP_TYPES.length];
  const budget = BUDGETS[i % BUDGETS.length];
  const publishDate = dateForIndex(i);
  const updatedDate = i % 6 === 0 ? dateForIndex(i + 1) : undefined;

  const title = TITLE_PATTERNS[i % TITLE_PATTERNS.length](place);
  const description = `A compact ${tripType} post for testing lists, filters, and search — kept intentionally short.`;

  const durationDays = (i % 5) + 2; // 2..6
  const duration = `${durationDays} days`;
  const travelDates = `${randPick([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ])} ${START_YEAR}`;

  const bilingual = i % 4 === 0;
  const mapCoordinates = mapCenter(place.destinations);

  const relatedPosts =
    i >= 2
      ? [
          `demo/${slugify(`${dateForIndex(i - 1)}-${TITLE_PATTERNS[(i - 1) % TITLE_PATTERNS.length](PLACE_POOL[(i - 1) % PLACE_POOL.length])}`)}`,
        ]
      : undefined;

  const fm = {
    title,
    description,
    publishDate, // z.coerce.date() will parse YYYY-MM-DD
    ...(updatedDate ? { updatedDate } : {}),

    lang: 'en',
    ...(bilingual ? { availableLanguages: ['en', 'vi'] } : { availableLanguages: ['en'] }),
    ...(bilingual ? { translationOf: `demo/${slugify(`${publishDate}-${title}`)}` } : {}), // optional field (safe)

    destinations: place.destinations.map((d, idx) => ({
      name: d.name,
      lat: d.lat,
      lng: d.lng,
      description: idx === 0 ? 'Main stop (demo)' : 'Quick stop (demo)',
    })),

    province: place.province,
    country: place.country,
    travelDates,
    duration,
    tripType,
    budget,

    coverImage: place.cover.img,
    coverImageAlt: place.cover.alt,
    photos: place.photos,

    draft: i % 17 === 0, // sprinkle a few drafts
    featured: i % 9 === 0,

    ...(mapCoordinates ? { mapCoordinates } : {}),

    author: {
      name: 'Travel Blogger',
      avatar: '/avatars/travel-author-avatar.jpg',
      bio: 'Demo author profile for testing UI.',
      socialMedia: {
        instagram: 'https://instagram.com/example',
      },
    },

    seo: {
      metaTitle: `${title} | Demo`,
      metaDescription: description,
      metaKeywords: [
        `${place.province} travel`,
        `${place.country} guide`,
        tripType,
        budget,
        'demo post',
      ],
    },

    travelTips: [
      'Go early for better light and fewer crowds',
      'Download offline maps before heading out',
      'Keep small cash for local spots',
    ],
    bestTimeToVisit: 'Varies by season (demo)',
    weatherInfo: 'Placeholder weather info for layout testing',
    languagesSpoken: place.languagesSpoken,
    currency: place.currency,

    ratings: ratingsForIndex(i),

    ...(relatedPosts ? { relatedPosts } : {}),
    tags: Array.from(new Set([...place.tags, tripType, budget])),
  };

  return { fm, place, title, publishDate };
}

function buildContent(i, title, place) {
  return `---
${toYamlFrontmatter(buildFrontmatter(i).fm)}
---
import { Image } from 'astro:assets';

# ${title}

_${place.province}, ${place.country} — this is a short demo post for testing UI._

## Highlights
- ${place.destinations[0]?.name ?? place.province}
- A few tags + tips to test filters
- Map coords + photos to test cards

## Notes
This content is intentionally short. It exists to test pagination, listing pages, and search.
`;
}

// Minimal YAML serializer that handles nested objects/arrays safely
function toYamlFrontmatter(obj, indent = 0) {
  const sp = '  '.repeat(indent);
  const isPlain = v =>
    typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null;

  const quote = s => {
    // Always JSON-quote strings to avoid YAML edge cases
    return JSON.stringify(s);
  };

  const render = (value, level) => {
    const pad = '  '.repeat(level);

    if (Array.isArray(value)) {
      if (value.length === 0) return ' []';
      const lines = value.map(item => {
        if (isPlain(item))
          return `${pad}- ${typeof item === 'string' ? quote(item) : String(item)}`;
        return `${pad}-\n${toYamlFrontmatter(item, level + 1)}`;
      });
      return `\n${lines.join('\n')}`;
    }

    if (value && typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) return ' {}';
      const lines = entries.map(([k, v]) => {
        if (isPlain(v)) {
          const vv = typeof v === 'string' ? quote(v) : v === null ? 'null' : String(v);
          return `${pad}${k}: ${vv}`;
        }
        return `${pad}${k}:${render(v, level + 1)}`;
      });
      return `\n${lines.join('\n')}`;
    }

    // primitive
    if (typeof value === 'string') return ` ${quote(value)}`;
    if (value === null) return ' null';
    return ` ${String(value)}`;
  };

  return Object.entries(obj)
    .map(([k, v]) => {
      if (isPlain(v)) {
        const vv = typeof v === 'string' ? quote(v) : v === null ? 'null' : String(v);
        return `${sp}${k}: ${vv}`;
      }
      return `${sp}${k}:${render(v, indent + 1)}`;
    })
    .join('\n');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(OUT_DIR);

  for (let i = 0; i < COUNT; i++) {
    const { place, title, publishDate } = buildFrontmatter(i);
    const slug = slugify(`${publishDate}-${title}`);
    const fileName = `${slug}.mdx`;

    const content = buildContent(i, title, place);
    fs.writeFileSync(path.join(OUT_DIR, fileName), content, 'utf8');
  }

  console.log(`✅ Generated ${COUNT} demo posts into: ${OUT_DIR}`);
  console.log(`Run: node scripts/gen-demo-posts.mjs 60 2024`);
}

main();
