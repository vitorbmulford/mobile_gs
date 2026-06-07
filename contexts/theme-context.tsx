import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { appThemes } from '@/constants/theme';
import type { AppTheme } from '@/constants/theme';
import type { ThemeMode } from '@/types/defense-shield';
import { STORAGE_KEYS } from '@/utils/storage';

interface ThemeContextValue {
  colorScheme: ThemeMode;
  isReady: boolean;
  theme: AppTheme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeModeProvider({ children }: React.PropsWithChildren) {
  const [colorScheme, setColorScheme] = useState<ThemeMode>('dark');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function hydrateTheme() {
      try {
        const storedMode = await AsyncStorage.getItem(STORAGE_KEYS.themeMode);
        if (storedMode === 'light' || storedMode === 'dark') {
          setColorScheme(storedMode);
        }
      } finally {
        setIsReady(true);
      }
    }

    hydrateTheme();
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEYS.themeMode, colorScheme).catch(() => {
      // Keep the UI responsive even if persistence fails.
    });
  }, [colorScheme, isReady]);

  const value = useMemo(
    () => ({
      colorScheme,
      isReady,
      theme: appThemes[colorScheme],
      setThemeMode: setColorScheme,
      toggleTheme: () => {
        setColorScheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
      },
    }),
    [colorScheme, isReady]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within ThemeModeProvider.');
  }

  return context;
}
