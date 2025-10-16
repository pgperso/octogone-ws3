"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Rediriger vers le dashboard admin
        router.push('/fr/admin/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Mot de passe incorrect');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4" style={{ 
      backgroundColor: 'var(--background)',
      minHeight: 'calc(100vh - 120px)', // Hauteur totale - navigation - footer
      paddingTop: '60px',
      paddingBottom: '60px'
    }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/partners/logo_octogne_full.png"
            alt="Octogone"
            width={120}
            height={35}
            className="h-8 w-auto mx-auto mb-4"
            priority
          />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--on-background)' }}>
            Administration
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--on-surface-variant)' }}>
            Accès restreint aux administrateurs
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--surface)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5" style={{ color: 'var(--on-surface-variant)' }} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    borderColor: 'var(--outline)',
                    color: 'var(--on-surface)'
                  }}
                  placeholder="Entrez votre mot de passe"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" style={{ color: 'var(--on-surface-variant)' }} />
                  ) : (
                    <Eye className="h-5 w-5" style={{ color: 'var(--on-surface-variant)' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#dcb26b',
                color: '#002236'
              }}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Footer discret */}
        <div className="text-center mt-8">
          <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
            © {new Date().getFullYear()} Octogone Collectif Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
