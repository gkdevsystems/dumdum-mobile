import { useCallback, useEffect } from 'react';
import { Appearance } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

import {
  getThemePreference,
  setThemePreference,
  type ThemePreference as Theme,
} from '@/utils/storage/themePreference';

export function useAppTheme() {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const theme: Theme = colorScheme === 'light' ? 'light' : 'dark';

  const applyTheme = useCallback((nextTheme: Theme) => {
    try {
      setColorScheme(nextTheme);
    } catch {
      const appearance = Appearance as typeof Appearance & {
        setColorScheme?: (scheme: Theme | null) => void;
      };
      appearance.setColorScheme?.(nextTheme);
    }
  }, [setColorScheme]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const storedTheme = await getThemePreference();
      if (!mounted || !storedTheme) {
        return;
      }
      applyTheme(storedTheme);
    })();

    return () => {
      mounted = false;
    };
  }, [applyTheme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
    void setThemePreference(nextTheme);
  }, [applyTheme]);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
