"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Bold, Italic, List, Heading2, Image as ImageIcon, Trash2, Link as LinkIcon } from 'lucide-react';

interface ArticleForm {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  locale: 'fr' | 'en';
}

const categories = [
  { id: 'nouveautes', name: 'Nouveautés' },
  { id: 'conseils', name: 'Conseils' },
  { id: 'etudes-cas', name: 'Études de cas' },
  { id: 'tendances', name: 'Tendances' }
];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    slug: '',
    category: 'conseils',
    tags: [],
    excerpt: '',
    content: '',
    image: '',
    published: false,
    locale: 'fr'
  });

  const loadArticle = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/articles/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert('Article non trouvé');
        router.push('/fr/admin/dashboard');
      }
    } catch {
      alert('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  const insertAtCursor = (before: string, after: string = '') => {
    if (!contentRef.current) return;
    
    const start = contentRef.current.selectionStart;
    const end = contentRef.current.selectionEnd;
    const text = formData.content;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    
    setFormData(prev => ({ ...prev, content: newText }));
    
    setTimeout(() => {
      if (contentRef.current) {
        const newPos = start + before.length + selectedText.length;
        contentRef.current.focus();
        contentRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  const handleInsertImageUrl = () => {
    const url = prompt('URL de l&rsquo;image :');
    if (url && url.trim()) {
      insertAtCursor(`![Description de l&rsquo;image](${url.trim()})\n\n`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formDataUpload
      });

      if (response.ok) {
        const data = await response.json();
        insertAtCursor(`![Description de l&rsquo;image](${data.url})\n\n`);
      } else {
        alert('Erreur lors de l&rsquo;upload de l&rsquo;image');
      }
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published: publish !== undefined ? publish : formData.published
        })
      });

      if (response.ok) {
        router.push('/fr/admin/dashboard');
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/articles/${slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/fr/admin/dashboard');
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch {
      alert('Erreur lors de la suppression');
    } finally {
      setSaving(false);
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
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/fr/admin/dashboard"
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              title="Retour"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={saving}
                className="p-2 rounded-lg transition-colors disabled:opacity-50 hover:opacity-80 cursor-pointer"
                style={{ backgroundColor: '#dc2626', color: 'white' }}
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="w-px h-8 bg-gray-300"></div>
              
              <button
                onClick={() => setPreview(!preview)}
                className="p-2 rounded-lg border transition-colors cursor-pointer"
                style={{ borderColor: 'var(--outline)', color: 'var(--on-surface)' }}
                title={preview ? 'Éditer' : 'Aperçu'}
              >
                <Eye className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="p-2 rounded-lg transition-colors disabled:opacity-50 hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: 'var(--success)', color: 'var(--on-success-container)' }}
                title="Sauvegarder"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu - Même structure que new/page.tsx */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            <div className="rounded-xl p-6 space-y-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--outline)' }}>
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                  Titre *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                  Résumé *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                />
              </div>

              {/* Contenu avec boutons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                    Contenu * (Markdown)
                  </label>
                  
                  {!preview && (
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => insertAtCursor('**', '**')} className="p-2 rounded hover:bg-gray-100" title="Gras">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor('*', '*')} className="p-2 rounded hover:bg-gray-100" title="Italique">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor('## ', '')} className="p-2 rounded hover:bg-gray-100" title="Titre">
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor('- ', '')} className="p-2 rounded hover:bg-gray-100" title="Liste">
                        <List className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <label className="p-2 rounded hover:bg-gray-100 cursor-pointer" title="Upload une image">
                        <ImageIcon className="w-4 h-4" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                      </label>
                      <button type="button" onClick={handleInsertImageUrl} className="p-2 rounded hover:bg-gray-100" title="Insérer image par URL">
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      {uploading && <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Upload...</span>}
                    </div>
                  )}
                </div>
                <textarea
                  ref={contentRef}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={20}
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono text-sm"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar - Métadonnées */}
          <div className="space-y-6">
            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--outline)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                Métadonnées
              </h3>

              {/* Catégorie */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 rounded-lg border text-sm"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      borderColor: 'var(--outline)',
                      color: 'var(--on-surface)'
                    }}
                    placeholder="Ajouter un tag"
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#dcb26b', color: '#002236' }}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                      style={{ backgroundColor: 'var(--surface-variant)', color: 'var(--on-surface)' }}
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                  Image de header
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                  placeholder="/images/blog/mon-image.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 max-w-md w-full shadow-2xl" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full" style={{ backgroundColor: '#fee2e2' }}>
                <Trash2 className="w-6 h-6" style={{ color: '#dc2626' }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--on-surface)' }}>
                Supprimer l&rsquo;article
              </h3>
            </div>
            
            <p className="mb-2" style={{ color: 'var(--on-surface)' }}>
              Êtes-vous sûr de vouloir supprimer :
            </p>
            <p className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
              &ldquo;{formData.title}&rdquo;
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--on-surface-variant)' }}>
              Cette action est irréversible. L&rsquo;article sera supprimé définitivement.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--surface-variant)', color: 'var(--on-surface)' }}
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: '#dc2626', color: 'white' }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
