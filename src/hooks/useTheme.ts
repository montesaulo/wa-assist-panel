import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const { preferences, updatePreferences } = useAppStore();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const themeToApply = preferences.theme === 'system' ? systemTheme : preferences.theme;
    root.classList.add(themeToApply);
  }, [preferences.theme, systemTheme]);

  const setTheme = (theme: Theme) => {
    updatePreferences({ theme });
  };

  const currentTheme = preferences.theme === 'system' ? systemTheme : preferences.theme;

  return {
    theme: preferences.theme,
    currentTheme,
    setTheme,
    systemTheme
  };
};