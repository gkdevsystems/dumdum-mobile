export type ThemeMode = 'light' | 'dark';
export type ThemePalette = 'rose' | 'ocean' | 'mint';

export type ThemeTokenSet = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  foreground: string;
  card: string;
  border: string;
  muted: string;
  primary: string;
};

declare const tokens: {
  light: ThemeTokenSet;
  dark: ThemeTokenSet;
  palettes: Record<ThemePalette, Record<ThemeMode, ThemeTokenSet>>;
  defaultPalette: ThemePalette;
  resolveTokens: (mode?: ThemeMode, palette?: ThemePalette) => ThemeTokenSet;
};

export default tokens;

