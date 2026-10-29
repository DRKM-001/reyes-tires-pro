import type { Config } from "tailwindcss";

// Same family look as reyestires.com: warm sand and near-black ink.
// Escondido identity: the pole-sign blue is the primary accent ("blaze"),
// logo red is the secondary accent ("royal"). Swap these two blocks to flip the identity.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./modules/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: { 50: "#faf6f0", 100: "#f3ebdd", 200: "#e7d6bd", 300: "#d8bd97", 400: "#c8a06f" },
        stone: { 750: "#2b2722", 850: "#211e1a", 950: "#16140f" },
        ink: { 800: "#15120e", 900: "#0d0b08", 950: "#070503" },
        blaze: { 50: "#eaf1fd", 100: "#d2e2fb", 400: "#4b8ef0", 500: "#1f6fe0", 600: "#1a5cc0", 700: "#164a9b" },
        royal: { 50: "#fdeaea", 100: "#fad1d1", 400: "#e23b3b", 500: "#d11f27", 600: "#b3151c", 700: "#8f1117" },
        wa: { 500: "#25D366", 600: "#1ebe5b" },
      },
      fontFamily: {
        display: ["Oswald", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
        stripes: "repeating-linear-gradient(-45deg, rgba(31,111,224,0.16) 0 14px, transparent 14px 30px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,30,26,0.04), 0 12px 32px -12px rgba(33,30,26,0.18)",
        blaze: "0 10px 30px -8px rgba(31,111,224,0.45)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        accOpen: { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        accClose: { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "acc-open": "accOpen 200ms ease-out",
        "acc-close": "accClose 180ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
