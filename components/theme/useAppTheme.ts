import { useCallback, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

import {
  getThemePalettePreference,
  getThemePreference,
  setThemePalettePreference,
  setThemePreference,
  type ThemePalette,
  type ThemePreference as Theme,
} from '@/utils/storage/themePreference';
import tokens from '@/theme/tokens';

const listeners = new Set<() => void>();
let hydrated = false;
let currentTheme: Theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
let currentPalette: ThemePalette = tokens.defaultPalette;
let snapshot = { theme: currentTheme, palette: currentPalette };

function updateSnapshot() {
  snapshot = { theme: currentTheme, palette: currentPalette };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

async function hydrateThemePreference() {
  if (hydrated) {
    return;
  }
  hydrated = true;

  const storedTheme = await getThemePreference();
  const storedPalette = await getThemePalettePreference();

  let hasUpdate = false;
  if (storedTheme && storedTheme !== currentTheme) {
    currentTheme = storedTheme;
    hasUpdate = true;
  }

  if (storedPalette && storedPalette !== currentPalette) {
    currentPalette = storedPalette;
    hasUpdate = true;
  }

  if (hasUpdate) {
    updateSnapshot();
    emitChange();
  }
}

export function useAppTheme() {
  const [state, setState] = useState(getSnapshot);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setState(getSnapshot());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    void hydrateThemePreference();
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme === currentTheme) {
      return;
    }
    currentTheme = nextTheme;
    updateSnapshot();
    emitChange();
    void setThemePreference(nextTheme);
  }, []);

  const setPalette = useCallback((nextPalette: ThemePalette) => {
    if (nextPalette === currentPalette) {
      return;
    }
    currentPalette = nextPalette;
    updateSnapshot();
    emitChange();
    void setThemePalettePreference(nextPalette);
  }, []);

  return {
    theme: state.theme,
    palette: state.palette,
    setTheme,
    setPalette,
    toggleTheme: () => setTheme(state.theme === 'dark' ? 'light' : 'dark'),
  };
}
