import { useCallback, useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

let currentTheme: Theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
const listeners = new Set<() => void>();

function emitThemeChange() {
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

export function useAppTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const setTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme === currentTheme) {
      return;
    }
    currentTheme = nextTheme;

    const appearance = Appearance as typeof Appearance & {
      setColorScheme?: (theme: Theme | null) => void;
    };
    appearance.setColorScheme?.(nextTheme);

    emitThemeChange();
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
