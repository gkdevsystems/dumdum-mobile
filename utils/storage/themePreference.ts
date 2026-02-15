import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark';
export type ThemePalette = 'rose' | 'ocean' | 'mint';

const THEME_PREFERENCE_KEY = '@suyamvaram/theme-preference';
const THEME_PALETTE_KEY = '@suyamvaram/theme-palette';

function isThemePreference(value: string): value is ThemePreference {
  return value === 'light' || value === 'dark';
}

function isThemePalette(value: string): value is ThemePalette {
  return value === 'rose' || value === 'ocean' || value === 'mint';
}

export async function getThemePreference() {
  const value = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
  if (!value || !isThemePreference(value)) {
    return null;
  }

  return value;
}

export async function setThemePreference(theme: ThemePreference) {
  await AsyncStorage.setItem(THEME_PREFERENCE_KEY, theme);
}

export async function getThemePalettePreference() {
  const value = await AsyncStorage.getItem(THEME_PALETTE_KEY);
  if (!value || !isThemePalette(value)) {
    return null;
  }
  return value;
}

export async function setThemePalettePreference(palette: ThemePalette) {
  await AsyncStorage.setItem(THEME_PALETTE_KEY, palette);
}
