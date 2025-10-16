/**
 * Server Actions pour le Blog
 * 
 * Fonctions côté serveur pour accéder aux fichiers Markdown
 */
import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost } from './types';

const BLOG_CONTENT_PATH_FR = path.join(process.cwd(), 'content', 'blog', 'fr');
const BLOG_CONTENT_PATH_EN = path.join(process.cwd(), 'content', 'blog', 'en');

/**
 * Server Action : Obtient tous les slugs des articles de blog
 */
export async function getAllBlogSlugsServer(): Promise<string[]> {
  const slugs = new Set<string>();
  
  // Lire les slugs français
  if (fs.existsSync(BLOG_CONTENT_PATH_FR)) {
    const frFiles = fs.readdirSync(BLOG_CONTENT_PATH_FR);
    frFiles
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        const slug = file.replace('.md', '');
        slugs.add(slug);
      });
  }
  
  // Lire les slugs anglais
  if (fs.existsSync(BLOG_CONTENT_PATH_EN)) {
    const enFiles = fs.readdirSync(BLOG_CONTENT_PATH_EN);
    enFiles
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        const slug = file.replace('.md', '');
        slugs.add(slug);
      });
  }
  
  return Array.from(slugs);
}

/**
 * Server Action : Obtient un article de blog par son slug et locale
 */
export async function getBlogPostBySlugServer(slug: string, locale?: 'fr' | 'en'): Promise<BlogPost | null> {
  try {
    // Si locale spécifiée, chercher dans le dossier correspondant
    if (locale) {
      const contentPath = locale === 'fr' ? BLOG_CONTENT_PATH_FR : BLOG_CONTENT_PATH_EN;
      const filePath = path.join(contentPath, `${slug}.md`);
      if (fs.existsSync(filePath)) {
        return await parseBlogPost(filePath, slug);
      }
    }
    
    // Sinon, chercher d'abord en français, puis en anglais
    const frPath = path.join(BLOG_CONTENT_PATH_FR, `${slug}.md`);
    const enPath = path.join(BLOG_CONTENT_PATH_EN, `${slug}.md`);
    
    if (fs.existsSync(frPath)) {
      return await parseBlogPost(frPath, slug);
    } else if (fs.existsSync(enPath)) {
      return await parseBlogPost(enPath, slug);
    }
    
    return null;
  } catch (error) {
    console.error(`Erreur lors de la lecture de l'article ${slug}:`, error);
    return null;
  }
}

/**
 * Fonction helper pour parser un fichier blog
 */
async function parseBlogPost(filePath: string, slug: string): Promise<BlogPost | null> {
  try {

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Validation des métadonnées requises
    if (!data.title || !data.date || !data.locale || data.published === false) {
      return null;
    }

    // Calculer le temps de lecture
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 mots par minute

    // Configurer marked pour bien gérer les paragraphes
    marked.setOptions({
      breaks: true, // Convertir les sauts de ligne en <br>
      gfm: true, // GitHub Flavored Markdown
    });
    
    // Convertir le Markdown en HTML
    const htmlContent = await marked(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'equipe-octogone',
      category: data.category || 'conseils',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      image: data.image || '/images/blog/default.jpg',
      locale: data.locale,
      published: data.published !== false,
      content: htmlContent,
      readingTime,
      wordCount,
      seo: {
        title: data.seo?.title || data.title,
        description: data.seo?.description || data.excerpt || '',
        keywords: data.seo?.keywords || data.tags || []
      },
      relatedPosts: data.relatedPosts || []
    };
  } catch (error) {
    console.error(`Erreur lors du parsing de l'article ${slug}:`, error);
    return null;
  }
}

/**
 * Server Action : Obtient tous les articles de blog avec filtres
 */
export async function getAllBlogPostsServer(options: {
  locale?: 'fr' | 'en';
  category?: string;
  publishedOnly?: boolean;
  limit?: number;
  offset?: number;
} = {}): Promise<BlogPost[]> {
  const { locale, category, publishedOnly = true, limit, offset = 0 } = options;

  let posts: BlogPost[] = [];
  const contentPath = locale === 'fr' ? BLOG_CONTENT_PATH_FR : 
                      locale === 'en' ? BLOG_CONTENT_PATH_EN : null;

  // Si locale spécifiée, lire seulement ce dossier
  if (contentPath && fs.existsSync(contentPath)) {
    const files = fs.readdirSync(contentPath);
    for (const file of files.filter(f => f.endsWith('.md'))) {
      const slug = file.replace('.md', '');
      const post = await getBlogPostBySlugServer(slug, locale);
      if (post && (!publishedOnly || post.published)) {
        posts.push(post);
      }
    }
  } else {
    // Sinon, lire les deux dossiers
    for (const [lang, langPath] of [['fr', BLOG_CONTENT_PATH_FR], ['en', BLOG_CONTENT_PATH_EN]] as const) {
      if (fs.existsSync(langPath)) {
        const files = fs.readdirSync(langPath);
        for (const file of files.filter(f => f.endsWith('.md'))) {
          const slug = file.replace('.md', '');
          const post = await getBlogPostBySlugServer(slug, lang);
          if (post && (!publishedOnly || post.published)) {
            posts.push(post);
          }
        }
      }
    }
  }

  // Filtres
  posts = posts.filter(post => {
    if (publishedOnly && !post.published) return false;
    if (locale && post.locale !== locale) return false;
    if (category && post.category !== category) return false;
    return true;
  });

  // Tri par date avec heure (plus récent en premier)
  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Pagination
  if (limit) {
    posts = posts.slice(offset, offset + limit);
  }

  return posts;
}

/**
 * Server Action : Obtient les articles liés
 */
export async function getRelatedPostsServer(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const currentPost = await getBlogPostBySlugServer(currentSlug);
  if (!currentPost) return [];

  // Si des articles liés sont spécifiés manuellement
  if (currentPost.relatedPosts && currentPost.relatedPosts.length > 0) {
    const relatedPosts: BlogPost[] = [];
    for (const slug of currentPost.relatedPosts) {
      const post = await getBlogPostBySlugServer(slug);
      if (post && post.published) {
        relatedPosts.push(post);
      }
    }
    return relatedPosts.slice(0, limit);
  }

  // Sinon, trouver des articles similaires par catégorie et tags
  const allPosts = await getAllBlogPostsServer({
    locale: currentPost.locale,
    publishedOnly: true
  });

  const filteredPosts = allPosts.filter(post => post.slug !== currentSlug);

  // Score de similarité
  const scoredPosts = filteredPosts.map(post => {
    let score = 0;
    
    // Même catégorie = +3 points
    if (post.category === currentPost.category) score += 3;
    
    // Tags communs = +1 point par tag
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += commonTags.length;
    
    return { post, score };
  });

  // Trier par score et retourner les meilleurs
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
