/**
 * Sitemap XML dynamique pour les articles de blog
 * Optimisé pour SEO et AI crawlers
 */

import { getAllBlogPostsServer } from '@/lib/blog/server-actions';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://octogone.ca';

export async function GET() {
  try {
    // Récupérer tous les articles publiés (FR et EN)
    const postsFr = await getAllBlogPostsServer({ locale: 'fr', publishedOnly: true });
    const postsEn = await getAllBlogPostsServer({ locale: 'en', publishedOnly: true });

    const allPosts = [...postsFr, ...postsEn];

    // Générer le XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Page principale du blog FR -->
  <url>
    <loc>${SITE_URL}/fr/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Page principale du blog EN -->
  <url>
    <loc>${SITE_URL}/en/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  ${allPosts
    .map((post) => {
      const url = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
      const alternateLocale = post.locale === 'fr' ? 'en' : 'fr';
      const alternateUrl = `${SITE_URL}/${alternateLocale}/blog/${post.slug}`;
      const lastmod = post.dateModified || post.date;

      return `
  <!-- ${post.title} -->
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${post.locale}" href="${url}" />
    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${alternateUrl}" />
    <image:image>
      <image:loc>${SITE_URL}${post.image}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>
  </url>`;
    })
    .join('')}

</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap blog:', error);
    return new Response('Erreur lors de la génération du sitemap', { status: 500 });
  }
}
