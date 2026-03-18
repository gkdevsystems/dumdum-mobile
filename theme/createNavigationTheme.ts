import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

import type { ThemeMode, ThemeTokenSet } from '@/theme/tokens';

/**
 * Expo Router uses React Navigation under the hood. This adapter keeps app tokens and
 * navigation colors in sync through one predictable function.
 */
export function createNavigationTheme(mode: ThemeMode, activeTokens: ThemeTokenSet): Theme {
  const isDarkNavigation = mode !== 'light';
  const baseTheme = isDarkNavigation ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: activeTokens.primary,
      background: activeTokens.background,
      card: activeTokens.card,
      text: activeTokens.text,
      border: activeTokens.border,
      notification: activeTokens.primary,
    },
  };
}
