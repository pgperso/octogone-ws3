/**
 * API Route pour récupérer les articles récents
 * Utilisable depuis les Client Components
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPostsServer } from '@/lib/blog/server-actions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') as 'fr' | 'en' || 'fr';
    const limit = parseInt(searchParams.get('limit') || '3');

    // Récupérer les articles
    const posts = await getAllBlogPostsServer({
      locale,
      publishedOnly: true,
      limit,
    });

    // Retourner seulement les données nécessaires (pas le contenu complet)
    const simplifiedPosts = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      locale: post.locale,
    }));

    return NextResponse.json(simplifiedPosts);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles récents:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    );
  }
}
