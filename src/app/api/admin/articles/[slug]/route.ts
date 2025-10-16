import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { validateAdminAuth, validateArticleData, sanitizeString } from '@/lib/admin/security';

const BLOG_CONTENT_PATH_FR = path.join(process.cwd(), 'content', 'blog', 'fr');
const BLOG_CONTENT_PATH_EN = path.join(process.cwd(), 'content', 'blog', 'en');

// GET - Charger un article pour édition
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authResult = validateAdminAuth(request);
    if (!authResult.valid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { slug } = await params;

    // Chercher d'abord en français
    const frPath = path.join(BLOG_CONTENT_PATH_FR, `${slug}.md`);
    const enPath = path.join(BLOG_CONTENT_PATH_EN, `${slug}.md`);

    let filePath = '';
    let locale: 'fr' | 'en' = 'fr';

    if (existsSync(frPath)) {
      filePath = frPath;
      locale = 'fr';
    } else if (existsSync(enPath)) {
      filePath = enPath;
      locale = 'en';
    } else {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    const fileContent = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return NextResponse.json({
      title: data.title || '',
      slug: data.slug || slug,
      category: data.category || 'conseils',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content: content,
      image: data.image || '',
      published: data.published !== false,
      locale: locale
    });

  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT - Mettre à jour un article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authResult = validateAdminAuth(request);
    if (!authResult.valid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { slug } = await params;
    const data = await request.json();

    // Valider les données
    const validation = validateArticleData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      );
    }

    // Sanitiser
    const sanitizedData = {
      title: sanitizeString(data.title),
      slug: sanitizeString(data.slug),
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags.map((tag: string) => sanitizeString(tag)) : [],
      excerpt: sanitizeString(data.excerpt),
      content: data.content,
      image: data.image ? sanitizeString(data.image) : '',
      published: Boolean(data.published),
      locale: data.locale || 'fr'
    };

    // Déterminer le chemin selon la locale
    const contentPath = sanitizedData.locale === 'fr' ? BLOG_CONTENT_PATH_FR : BLOG_CONTENT_PATH_EN;
    const filePath = path.join(contentPath, `${slug}.md`);

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    // Lire le fichier existant pour garder la date
    const existingContent = await readFile(filePath, 'utf8');
    const { data: existingData } = matter(existingContent);

    // Générer le nouveau frontmatter avec dateModified
    const frontmatter = `---
title: "${sanitizedData.title}"
slug: "${sanitizedData.slug}"
date: "${existingData.date || new Date().toISOString()}"
dateModified: "${new Date().toISOString()}"
author: "${existingData.author || 'equipe-octogone'}"
category: "${sanitizedData.category}"
tags: [${sanitizedData.tags.map((tag: string) => `"${tag}"`).join(', ')}]
excerpt: "${sanitizedData.excerpt}"
image: "${sanitizedData.image || '/images/blog/blog_header.jpg'}"
locale: "${sanitizedData.locale}"
published: ${sanitizedData.published}
seo:
  title: "${sanitizedData.title}"
  description: "${sanitizedData.excerpt}"
  keywords: [${sanitizedData.tags.map((tag: string) => `"${tag}"`).join(', ')}]
---

${sanitizedData.content}`;

    await writeFile(filePath, frontmatter, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Article mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer un article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authResult = validateAdminAuth(request);
    if (!authResult.valid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { slug } = await params;

    // Supprimer les deux versions (FR et EN)
    const frPath = path.join(BLOG_CONTENT_PATH_FR, `${slug}.md`);
    const enPath = path.join(BLOG_CONTENT_PATH_EN, `${slug}.md`);

    let deleted = false;

    if (existsSync(frPath)) {
      await import('fs/promises').then(fs => fs.unlink(frPath));
      deleted = true;
    }

    if (existsSync(enPath)) {
      await import('fs/promises').then(fs => fs.unlink(enPath));
      deleted = true;
    }

    if (!deleted) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
