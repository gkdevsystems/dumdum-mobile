import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

import {
  getThemePreference,
  setThemePreference,
  type ThemePreference as Theme,
} from '@/utils/storage/themePreference';

const listeners = new Set<() => void>();
let hydrated = false;
let currentTheme: Theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentTheme;
}

async function hydrateThemePreference() {
  if (hydrated) {
    return;
  }
  hydrated = true;

  const storedTheme = await getThemePreference();
  if (!storedTheme || storedTheme === currentTheme) {
    return;
  }

  currentTheme = storedTheme;
  emitChange();
}

export function useAppTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    void hydrateThemePreference();
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme === currentTheme) {
      return;
    }
    currentTheme = nextTheme;
    emitChange();
    void setThemePreference(nextTheme);
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
