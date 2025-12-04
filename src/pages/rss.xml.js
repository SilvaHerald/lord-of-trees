import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
  // Get all blog posts
  const blogPosts = await getCollection('post');

  // Filter for English posts (default feed)
  const enPosts = blogPosts.filter(post => post.data.lang === 'en');

  // Sort by publish date, newest first
  const sortedPosts = enPosts.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'Travel Stories Blog',
    description:
      'Discover amazing travel destinations, hidden gems, and adventure stories from around the world.',
    site: context.site,
    items: sortedPosts.map(post => {
      // Extract the slug without language prefix
      const slug = post.slug.replace(/^(en|vi)\//, '');

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
        link: `/stories/${slug}`,
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
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
    stylesheet: '/rss/styles.xsl',
  });
}
