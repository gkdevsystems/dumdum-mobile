const palettes = {
  rose: {
    light: {
      text: '#0f172a',
      background: '#fff7fb',
      tint: '#f43f5e',
      tabIconDefault: '#94a3b8',
      tabIconSelected: '#f43f5e',
      foreground: '#0f172a',
      card: '#ffffff',
      border: '#e2e8f0',
      muted: '#64748b',
      primary: '#f43f5e',
    },
    dark: {
      text: '#f8fafc',
      background: '#0b1220',
      tint: '#fda4af',
      tabIconDefault: '#64748b',
      tabIconSelected: '#fda4af',
      foreground: '#f8fafc',
      card: '#162033',
      border: '#273449',
      muted: '#94a3b8',
      primary: '#fda4af',
    },
  },
  ocean: {
    light: {
      text: '#0b1220',
      background: '#f3f8ff',
      tint: '#2563eb',
      tabIconDefault: '#94a3b8',
      tabIconSelected: '#2563eb',
      foreground: '#0b1220',
      card: '#ffffff',
      border: '#dbe7ff',
      muted: '#64748b',
      primary: '#2563eb',
    },
    dark: {
      text: '#f8fafc',
      background: '#07101f',
      tint: '#60a5fa',
      tabIconDefault: '#64748b',
      tabIconSelected: '#60a5fa',
      foreground: '#f8fafc',
      card: '#10203a',
      border: '#24344d',
      muted: '#93a6bf',
      primary: '#60a5fa',
    },
  },
  mint: {
    light: {
      text: '#0f172a',
      background: '#f3fdf8',
      tint: '#10b981',
      tabIconDefault: '#94a3b8',
      tabIconSelected: '#10b981',
      foreground: '#0f172a',
      card: '#ffffff',
      border: '#d9f5e9',
      muted: '#64748b',
      primary: '#10b981',
    },
    dark: {
      text: '#f8fafc',
      background: '#081610',
      tint: '#34d399',
      tabIconDefault: '#64748b',
      tabIconSelected: '#34d399',
      foreground: '#f8fafc',
      card: '#12261d',
      border: '#264137',
      muted: '#9cb5aa',
      primary: '#34d399',
    },
  },
};

const defaultPalette = 'rose';
const defaultMode = 'light';

function resolveTokens(mode = defaultMode, palette = defaultPalette) {
  const selectedPalette = palettes[palette] || palettes[defaultPalette];
  return selectedPalette[mode] || selectedPalette[defaultMode];
}

const defaultTokens = resolveTokens(defaultMode, defaultPalette);
const darkTokens = resolveTokens('dark', defaultPalette);

const tokens = {
  light: defaultTokens,
  dark: darkTokens,
  palettes,
  defaultPalette,
  resolveTokens,
};

module.exports = tokens;
module.exports.default = tokens;

