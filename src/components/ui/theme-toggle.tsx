'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeContext } from '@/components/providers/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('🔄 Toggle clicked! Current:', theme, '→ New:', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 hover:opacity-80 cursor-pointer"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--outline)',
        color: 'var(--on-background)'
      }}
      aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
      title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-180" />
      )}
    </button>
  );
}
