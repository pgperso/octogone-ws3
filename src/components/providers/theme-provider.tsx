'use client';

import { createContext, useContext, useEffect } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';

type Theme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const { theme, setTheme: setStoreTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    
    console.log('🎨 Theme changed to:', theme);
    
    // Ajouter la classe pour désactiver les transitions
    root.classList.add('theme-transitioning');
    
    // Changer le thème
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    console.log('✅ HTML classes:', root.className);
    
    // Retirer la classe après un court délai
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 50);
  }, [theme]);

  const value = {
    theme,
    setTheme: setStoreTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useThemeContext must be used within a ThemeProvider');

  return context;
};
