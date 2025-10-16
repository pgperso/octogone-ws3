import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPostsServer } from '@/lib/blog/server-actions';

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const sessionCookie = request.cookies.get('admin-session');
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer tous les articles (FR + EN)
    const frPosts = await getAllBlogPostsServer({ 
      locale: 'fr', 
      publishedOnly: false // Inclure les brouillons
    });
    
    const enPosts = await getAllBlogPostsServer({ 
      locale: 'en', 
      publishedOnly: false // Inclure les brouillons
    });

    // Combiner et formater pour l'admin
    const allPosts = [...frPosts, ...enPosts].map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      author: post.author,
      category: post.category,
      locale: post.locale,
      published: post.published
    }));

    // Trier par date (plus récent en premier)
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
