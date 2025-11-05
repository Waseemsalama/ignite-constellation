import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#FFD76B", accent: "#6C63FF", bg: "#0A0E18" },
      boxShadow: { glow: "0 0 24px rgba(255,215,107,.35)" },
    },
  },
  plugins: [],
} satisfies Config;
