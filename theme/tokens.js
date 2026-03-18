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
      text: '#ffe8ef',
      background: '#120814',
      tint: '#ff7ca3',
      tabIconDefault: '#8f6f84',
      tabIconSelected: '#ff7ca3',
      foreground: '#ffe8ef',
      card: '#231029',
      border: '#4b1d35',
      muted: '#c7a3b4',
      primary: '#ff5d87',
    },
    frost: {
      text: '#f4f7ff',
      background: '#06091a',
      tint: '#ff79b3',
      tabIconDefault: '#a0add1',
      tabIconSelected: '#ff79b3',
      foreground: '#f4f7ff',
      card: '#324771',
      border: '#a4bfff',
      muted: '#c2cee9',
      primary: '#ff79b3',
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
    frost: {
      text: '#f2f9ff',
      background: '#071021',
      tint: '#5ce1ff',
      tabIconDefault: '#9fb7d8',
      tabIconSelected: '#5ce1ff',
      foreground: '#f2f9ff',
      card: '#2d4c72',
      border: '#9ad7ff',
      muted: '#c3d8ef',
      primary: '#5ce1ff',
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
    frost: {
      text: '#f1fff9',
      background: '#07140f',
      tint: '#66f0cd',
      tabIconDefault: '#a0c2b6',
      tabIconSelected: '#66f0cd',
      foreground: '#f1fff9',
      card: '#2f5b50',
      border: '#9be8d1',
      muted: '#c4e4da',
      primary: '#66f0cd',
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
const frostTokens = resolveTokens('frost', defaultPalette);

const tokens = {
  light: defaultTokens,
  dark: darkTokens,
  frost: frostTokens,
  palettes,
  defaultPalette,
  resolveTokens,
};

module.exports = tokens;
module.exports.default = tokens;
