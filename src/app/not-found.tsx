'use client';

import Link from 'next/link';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-2xl w-full text-center">
        {/* Numéro 404 stylisé */}
        <div className="mb-8">
          <h1 
            className="text-9xl font-bold mb-4"
            style={{ 
              color: 'var(--primary)',
              textShadow: '0 4px 20px rgba(220, 178, 107, 0.3)'
            }}
          >
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-1 w-16 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
            <Search className="w-6 h-6" style={{ color: 'var(--primary)' }} />
            <div className="h-1 w-16 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--on-surface)' }}>
          Page introuvable
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--on-surface-variant)' }}>
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/fr">
            <OctogoneButton
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Retour à l&apos;accueil
            </OctogoneButton>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)'
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: 'var(--surface-variant)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
            Liens utiles
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link 
              href="/fr/fonctionnalites/inventaire"
              className="px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)'
              }}
            >
              Inventaire
            </Link>
            <Link 
              href="/fr/fonctionnalites/recettes"
              className="px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)'
              }}
            >
              Recettes
            </Link>
            <Link 
              href="/fr/modules/octogone-360"
              className="px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)'
              }}
            >
              Octogone 360
            </Link>
            <Link 
              href="/fr/contact"
              className="px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)'
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
