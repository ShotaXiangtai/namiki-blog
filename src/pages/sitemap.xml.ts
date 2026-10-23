import type { APIRoute } from 'astro';
import { getPublishedPosts, getAllTags } from '../utils/posts';
import { SITE_CONFIG } from '../config';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const tags = await getAllTags();
  const siteUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');

  const staticPages = [
    { url: `${siteUrl}/`, changefreq: 'daily', priority: '1.0' },
    { url: `${siteUrl}/about/`, changefreq: 'monthly', priority: '0.8' },
    { url: `${siteUrl}/tags/`, changefreq: 'weekly', priority: '0.7' },
  ];

  const tagPages = tags.map((t) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(t.name)}/`,
    changefreq: 'weekly',
    priority: '0.6',
  }));

  const postPages = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.id}/`,
    lastmod: post.data.pubDate.toISOString(),
    changefreq: 'monthly',
    priority: post.data.pinned ? '0.9' : '0.8',
  }));

  const allEntries = [...staticPages, ...postPages, ...tagPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    ${'lastmod' in entry && entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`.trim();

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
