import { postSchema } from '@schemas/post.schema';
import { defineCollection } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: postSchema,
});

export const collections = {
  posts,
};

// Example usage in a travel blog post:
/*
---
title: "Discovering Hidden Gems in Kyoto: A Solo Traveler's Guide"
description: "Join me on a 10-day solo adventure through Kyoto's lesser-known temples, secret gardens, and traditional neighborhoods that most tourists never see."
publishDate: 2024-03-15
destinations: ["Kyoto", "Arashiyama", "Gion District", "Fushimi"]
countries: ["Japan"]
travelDates: "March 2024"
duration: "10 days"
tripType: "Solo Travel"
budget: "Mid-Range"
coverImage: "/images/kyoto/kyoto-bamboo-forest-cover.jpg"
coverImageAlt: "Morning sunlight filtering through the famous Arashiyama Bamboo Grove"
photos: [
  "/images/kyoto/kiyomizu-temple.jpg",
  "/images/kyoto/geisha-district.jpg",
  "/images/kyoto/traditional-meal.jpg",
  "/images/kyoto/cherry-blossoms.jpg"
]
featured: true
mapCoordinates:
  lat: 35.0116
  lng: 135.7681
travelTips: [
  "Buy a Kyoto City Bus Pass for unlimited daily rides",
  "Visit temples early morning to avoid crowds",
  "Learn basic Japanese greetings - locals appreciate the effort",
  "Always carry cash as many places don't accept cards"
]
bestTimeToVisit: "March-May (Cherry Blossom season) or October-November (Autumn colors)"
weatherInfo: "Mild spring weather, perfect for walking. Pack layers as mornings can be cool."
languagesSpoken: ["Japanese", "Limited English in tourist areas"]
currency: "Japanese Yen (¥)"
ratings:
  overall: 5
  accommodation: 4
  food: 5
  activities: 5
  transportation: 4
  safety: 5
tags: ["Japan", "Solo Travel", "Culture", "Temples", "Cherry Blossoms", "Traditional Architecture"]
seo:
  metaTitle: "Ultimate Solo Travel Guide to Kyoto's Hidden Gems | Travel Blog"
  metaDescription: "Discover Kyoto's secret temples and traditional districts with this comprehensive 10-day solo travel guide. Includes budget tips, hidden spots, and local insights."
  metaKeywords: ["Kyoto travel guide", "solo travel Japan", "hidden temples Kyoto", "Japan travel tips"]
---
*/

/*
Folder structure for multilingual content:

src/content/blog/
├── en/
│   ├── bali-adventure.mdx
│   ├── kyoto-temples.mdx
│   └── paris-hidden-gems.mdx
├── vi/
│   ├── bali-adventure.mdx
│   ├── kyoto-temples.mdx
│   └── paris-hidden-gems.mdx
└── es/
    ├── bali-adventure.mdx
    └── kyoto-temples.mdx

Example frontmatter for English post:
---
title: "72 Hours in Bali"
lang: en
availableLanguages: ['en', 'vi', 'es']
countries: ['Indonesia']
---

Example frontmatter for Vietnamese translation:
---
title: "72 Giờ ở Bali"
lang: vi
translationOf: "bali-adventure"
availableLanguages: ['en', 'vi', 'es']
countries: ['Indonesia']
---
*/
