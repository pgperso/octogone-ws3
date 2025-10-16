"use client";

import React from 'react';
import { BlogPost } from '@/lib/blog/types';
import { BlogCard } from './blog-card';

interface BlogRelatedPostsProps {
  posts: BlogPost[];
  locale: 'fr' | 'en';
}

export const BlogRelatedPosts: React.FC<BlogRelatedPostsProps> = ({
  posts,
  locale
}) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: 'var(--on-background)' }}>
        {locale === 'fr' ? 'Articles liés' : 'Related Articles'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            locale={locale}
            showExcerpt={true}
            showAuthor={false}
            showReadingTime={true}
            showCategory={true}
          />
        ))}
      </div>
    </div>
  );
};
