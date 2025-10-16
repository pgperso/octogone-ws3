"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, FileText, Edit, Eye, LogOut } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  locale: 'fr' | 'en';
  published: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/check-auth');
      if (!response.ok) {
        router.push('/fr/admin');
      }
    } catch {
      router.push('/fr/admin');
    }
  }, [router]);

  const loadPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Vérifier l'authentification
    checkAuth();
    // Charger les articles
    loadPosts();
  }, [checkAuth, loadPosts]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/fr/admin');
    } catch {
      router.push('/fr/admin');
    }
  };

  const togglePublish = async (slug: string, published: boolean) => {
    try {
      const response = await fetch('/api/admin/posts/toggle-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, published: !published })
      });
      
      if (response.ok) {
        loadPosts(); // Recharger la liste
      }
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: '#dcb26b' }}></div>
          <p style={{ color: 'var(--on-surface-variant)' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header Admin */}
      <div className="border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--on-surface)' }}>
                Administration Octogone Insight
              </h1>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Gestion des articles de blog
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
              style={{ backgroundColor: 'var(--error)', color: 'white' }}
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--on-background)' }}>
              Articles ({posts.length})
            </h2>
            <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Gérez vos articles de blog Octogone Insight
            </p>
          </div>
          <Link
            href="/fr/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#dcb26b', color: '#002236' }}
          >
            <Plus className="w-4 h-4" />
            Nouvel Article
          </Link>
        </div>

        {/* Liste des articles */}
        <div className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--outline)' }}>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--on-surface-variant)' }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                Aucun article
              </h3>
              <p className="mb-4" style={{ color: 'var(--on-surface-variant)' }}>
                Commencez par créer votre premier article
              </p>
              <Link
                href="/fr/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
                style={{ backgroundColor: '#dcb26b', color: '#002236' }}
              >
                <Plus className="w-4 h-4" />
                Créer un article
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: 'var(--surface-variant)' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--on-surface-variant)' }}>
                      Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--on-surface-variant)' }}>
                      Langue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--on-surface-variant)' }}>
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--on-surface-variant)' }}>
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--on-surface-variant)' }}>
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--on-surface-variant)' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--outline)' }}>
                  {posts.map((post) => (
                    <tr key={`${post.slug}-${post.locale}`} className="hover:bg-opacity-50" style={{ backgroundColor: 'var(--surface)' }}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                            {post.title}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                            {post.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{
                          backgroundColor: post.locale === 'fr' ? '#dbeafe' : '#fef3c7',
                          color: post.locale === 'fr' ? '#1e40af' : '#92400e'
                        }}>
                          {post.locale.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                        {post.category}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                        {new Date(post.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(post.slug, post.published)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                            post.published 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {post.published ? 'Publié' : 'Brouillon'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/fr/blog/${post.slug}`}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            title="Voir l'article"
                          >
                            <Eye className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                          </Link>
                          <Link
                            href={`/fr/admin/blog/edit/${post.slug}`}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
