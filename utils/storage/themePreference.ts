import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark';

const THEME_PREFERENCE_KEY = '@suyamvaram/theme-preference';

function isThemePreference(value: string): value is ThemePreference {
  return value === 'light' || value === 'dark';
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
