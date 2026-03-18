export type ThemeMode = 'light' | 'dark' | 'frost';
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

export type ThemeCssVars = {
  '--app-background': string;
  '--app-foreground': string;
  '--app-card': string;
  '--app-border': string;
  '--app-muted': string;
  '--app-primary': string;
};

declare const tokens: {
  light: ThemeTokenSet;
  dark: ThemeTokenSet;
  frost: ThemeTokenSet;
  palettes: Record<ThemePalette, Record<ThemeMode, ThemeTokenSet>>;
  defaultPalette: ThemePalette;
  resolveTokens: (mode?: ThemeMode, palette?: ThemePalette) => ThemeTokenSet;
  hexToRgb: (hex: string) => string;
  toCssVars: (tokenSet: ThemeTokenSet) => ThemeCssVars;
};

export default tokens;
