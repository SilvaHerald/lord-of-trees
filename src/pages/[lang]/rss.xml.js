import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

// Language configuration - must match the one in /rss.xml.js
const LANGUAGE_CONFIG = {
  en: {
    title: 'Travel Stories Blog',
    description:
      'Discover amazing travel destinations, hidden gems, and adventure stories from around the world.',
    language: 'en-us',
  },
  vi: {
    title: 'Blog Du Lịch - Travel Stories',
    description:
      'Khám phá những điểm đến tuyệt vời, viên ngọc ẩn và câu chuyện phiêu lưu từ khắp nơi trên thế giới.',
    language: 'vi',
  },
  // Add more languages here as needed
};

// Generate static paths for all configured languages
export function getStaticPaths() {
  return Object.keys(LANGUAGE_CONFIG).map(lang => ({
    params: { lang },
  }));
}

export async function GET(context) {
  const { lang } = context.params;

  // Validate language exists
  if (!LANGUAGE_CONFIG[lang]) {
    throw new Error(`Language '${lang}' not configured in RSS feed`);
  }

  // Get all blog posts
  const blogPosts = await getCollection('blog');

  // Filter posts for current language
  const langPosts = blogPosts.filter(post => post.data.lang === lang);

  // Sort by publish date, newest first
  const sortedPosts = langPosts.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  const config = LANGUAGE_CONFIG[lang];

  return rss({
    title: config.title,
    description: config.description,
    site: context.site,
    items: sortedPosts.map(post => {
      // Extract the slug without language prefix
      const slug = post.slug.replace(/^[a-z]{2}\//, '');

      // Build link based on whether it's default language or not
      const link = lang === 'en' ? `/stories/${slug}` : `/${lang}/stories/${slug}`;

      return {
        title: post.data.title,
        pubDate: post.data.publishDate,
        description: post.data.description,
        categories: [
          ...(post.data.tags || []),
          ...(post.data.countries || []),
          ...(post.data.destinations || []),
          post.data.tripType,
        ].filter(Boolean),
        link: link,
        content: sanitizeHtml(post.body, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title'],
          },
        }),
        customData: `
          ${post.data.coverImage ? `<enclosure url="${new URL(post.data.coverImage, context.site).href}" type="image/jpeg" />` : ''}
          ${post.data.countries?.map(country => `<category>${country}</category>`).join('\n') || ''}
          ${post.data.duration ? `<duration>${post.data.duration}</duration>` : ''}
          ${post.data.tripType ? `<tripType>${post.data.tripType}</tripType>` : ''}
          ${post.data.budget ? `<budget>${post.data.budget}</budget>` : ''}
          ${post.data.ratings?.overall ? `<rating>${post.data.ratings.overall}</rating>` : ''}
        `.trim(),
      };
    }),
    customData: `
      <language>${config.language}</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
    stylesheet: '/rss/styles.xsl',
  });
}
