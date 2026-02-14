const tokens = require("./theme/tokens");

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          background: "rgb(var(--app-background) / <alpha-value>)",
          foreground: "rgb(var(--app-foreground) / <alpha-value>)",
          card: "rgb(var(--app-card) / <alpha-value>)",
          border: "rgb(var(--app-border) / <alpha-value>)",
          muted: "rgb(var(--app-muted) / <alpha-value>)",
          primary: "rgb(var(--app-primary) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--app-background": hexToRgb(tokens.light.background),
          "--app-foreground": hexToRgb(tokens.light.foreground),
          "--app-card": hexToRgb(tokens.light.card),
          "--app-border": hexToRgb(tokens.light.border),
          "--app-muted": hexToRgb(tokens.light.muted),
          "--app-primary": hexToRgb(tokens.light.primary),
        },
        ".dark": {
          "--app-background": hexToRgb(tokens.dark.background),
          "--app-foreground": hexToRgb(tokens.dark.foreground),
          "--app-card": hexToRgb(tokens.dark.card),
          "--app-border": hexToRgb(tokens.dark.border),
          "--app-muted": hexToRgb(tokens.dark.muted),
          "--app-primary": hexToRgb(tokens.dark.primary),
        },
      });
    },
  ],
};
