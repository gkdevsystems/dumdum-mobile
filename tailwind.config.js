const tokens = require("./theme/tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--app-border) / <alpha-value>)",
        input: "rgb(var(--app-border) / <alpha-value>)",
        ring: "rgb(var(--app-primary) / <alpha-value>)",
        background: "rgb(var(--app-background) / <alpha-value>)",
        foreground: "rgb(var(--app-foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--app-primary) / <alpha-value>)",
          foreground: "255 255 255",
        },
        secondary: {
          DEFAULT: "rgb(var(--app-card) / <alpha-value>)",
          foreground: "rgb(var(--app-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "239 68 68",
          foreground: "255 255 255",
        },
        muted: {
          DEFAULT: "rgb(var(--app-card) / <alpha-value>)",
          foreground: "rgb(var(--app-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--app-card) / <alpha-value>)",
          foreground: "rgb(var(--app-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--app-card) / <alpha-value>)",
          foreground: "rgb(var(--app-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--app-card) / <alpha-value>)",
          foreground: "rgb(var(--app-foreground) / <alpha-value>)",
        },
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
        ":root": tokens.toCssVars(tokens.light),
        ".dark": tokens.toCssVars(tokens.dark),
      });
    },
  ],
};
