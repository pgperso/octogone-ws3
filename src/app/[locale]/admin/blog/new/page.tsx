"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, X, Bold, Italic, List, Heading2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ArticleForm {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
}

const categories = [
  { id: 'nouveautes', name: 'Nouveautés' },
  { id: 'conseils', name: 'Conseils' },
  { id: 'etudes-cas', name: 'Études de cas' },
  { id: 'tendances', name: 'Tendances' }
];

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false);
  // const [cursorPosition, setCursorPosition] = useState(0); // Unused
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    slug: '',
    category: 'conseils',
    tags: [],
    excerpt: '',
    content: '',
    image: '',
    published: false
  });

  // Générer automatiquement le slug depuis le titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
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

  // Fonctions d'aide au formatage
  const insertAtCursor = (before: string, after: string = '') => {
    if (!contentRef.current) return;
    
    const start = contentRef.current.selectionStart;
    const end = contentRef.current.selectionEnd;
    const text = formData.content;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    
    setFormData(prev => ({ ...prev, content: newText }));
    
    // Repositionner le curseur
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
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        insertAtCursor(`![Description de l&rsquo;image](${data.url})\n\n`);
      } else {
        alert('Erreur lors de l\'upload de l\'image');
      }
    } catch {
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/articles/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published: publish
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/fr/admin/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Link>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--on-surface)' }}>
                  Nouvel Article
                </h1>
                <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  Créer un article pour Octogone Insight
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
                style={{ borderColor: 'var(--outline)', color: 'var(--on-surface)' }}
              >
                <Eye className="w-4 h-4" />
                {preview ? 'Éditer' : 'Aperçu'}
              </button>
              
              <button
                onClick={() => handleSave(false)}
                disabled={saving || !formData.title}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: 'var(--surface-variant)', color: 'var(--on-surface)' }}
              >
                <Save className="w-4 h-4" />
                Brouillon
              </button>
              
              <button
                onClick={() => handleSave(true)}
                disabled={saving || !formData.title || !formData.content}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#dcb26b', color: '#002236' }}
              >
                <Save className="w-4 h-4" />
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
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
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                  placeholder="Titre de votre article"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                  URL (slug)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                  placeholder="url-de-votre-article"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                  URL: /fr/blog/{formData.slug}
                </p>
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
                  placeholder="Résumé court de votre article (affiché sur les cartes)"
                />
              </div>

              {/* Contenu */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                    Contenu * (Markdown)
                  </label>
                  
                  {/* Boutons de formatage */}
                  {!preview && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => insertAtCursor('**', '**')}
                        className="p-2 rounded hover:bg-gray-100 transition-colors"
                        title="Gras"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertAtCursor('*', '*')}
                        className="p-2 rounded hover:bg-gray-100 transition-colors"
                        title="Italique"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertAtCursor('## ', '')}
                        className="p-2 rounded hover:bg-gray-100 transition-colors"
                        title="Titre"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertAtCursor('- ', '')}
                        className="p-2 rounded hover:bg-gray-100 transition-colors"
                        title="Liste"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <label className="p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer" title="Upload une image">
                        <ImageIcon className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleInsertImageUrl}
                        className="p-2 rounded hover:bg-gray-100 transition-colors"
                        title="Insérer image par URL"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      {uploading && <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Upload...</span>}
                    </div>
                  )}
                </div>
                {preview ? (
                  <div 
                    className="w-full min-h-96 p-4 rounded-lg border prose max-w-none"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      borderColor: 'var(--outline)',
                      color: 'var(--on-surface)'
                    }}
                    dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br>') }}
                  />
                ) : (
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
                    placeholder="# Votre titre

Votre contenu en Markdown...

## Sous-titre

- Liste à puces
- Autre élément

**Texte en gras** et *italique*

![Image](/images/blog/mon-image.jpg)"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Métadonnées */}
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
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                        <X className="w-3 h-3" />
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
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                  placeholder="/images/blog/mon-image.jpg"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                  Laissez vide pour utiliser l&rsquo;image par défaut
                </p>
              </div>
            </div>

            {/* Aide Markdown */}
            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--outline)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                Aide Markdown
              </h3>
              <div className="space-y-2 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                <div><code># Titre</code> → Titre principal</div>
                <div><code>## Sous-titre</code> → Sous-titre</div>
                <div><code>**gras**</code> → <strong>gras</strong></div>
                <div><code>*italique*</code> → <em>italique</em></div>
                <div><code>- Liste</code> → Liste à puces</div>
                <div><code>![Alt](/image.jpg)</code> → Image</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
