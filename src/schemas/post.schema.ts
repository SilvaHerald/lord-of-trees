import { z } from 'astro:content';

export const postSchema = z.object({
  // Basic post info
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),

  // i18n fields
  lang: z.enum(['en', 'vi']).default('en'),
  translationOf: z.string().optional(), // Slug of the original post
  availableLanguages: z.array(z.enum(['en', 'vi'])).default([]),

  // Travel-specific fields
  destinations: z
    .array(
      z.object({
        name: z.string(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .default([]),
  province: z.string(),
  country: z.string(),
  travelDates: z.string(), // e.g., "March 2024" or "Summer 2023"
  duration: z.string(), // e.g., "2 weeks", "10 days"
  tripType: z.enum([
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
  ]),
  budget: z.enum(['budget', 'midRange', 'luxury', 'backpacker']),

  // Visual content
  coverImage: z.string(),
  coverImageAlt: z.string().optional(),
  photos: z.array(z.string()).default([]), // Additional photos for gallery

  // Post settings
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),

  // Map and location data
  mapCoordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),

  // Author info
  author: z
    .object({
      name: z.string().default('Travel Blogger'),
      email: z.string().email().optional(),
      avatar: z.string().default('/avatars/travel-author-avatar.jpg'),
      bio: z.string().optional(),
      socialMedia: z
        .object({
          twitter: z.string().optional(),
          instagram: z.string().optional(),
          youtube: z.string().optional(),
          website: z.string().optional(),
        })
        .optional(),
    })
    .default({}),

  // SEO and metadata
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().optional(),
    })
    .optional(),

  // Travel tips and practical info
  travelTips: z.array(z.string()).optional(),
  bestTimeToVisit: z.string().optional(),
  weatherInfo: z.string().optional(),
  languagesSpoken: z.array(z.string()).optional(),
  currency: z.string().optional(),

  // Experience ratings (1-5 scale)
  ratings: z
    .object({
      overall: z.number().min(1).max(5).optional(),
      accommodation: z.number().min(1).max(5).optional(),
      food: z.number().min(1).max(5).optional(),
      activities: z.number().min(1).max(5).optional(),
      transportation: z.number().min(1).max(5).optional(),
      safety: z.number().min(1).max(5).optional(),
    })
    .optional(),

  // Related content
  relatedPosts: z.array(z.string()).optional(),
  tags: z.array(z.string()).default([]),
});
