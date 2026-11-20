import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        // New brand palette
        cream: "#FAF7F1",
        brown: "#4B4038",
        sage: "#7E9A84",
        "sage-soft": "#B9CBB4",
        "sage-tint": "#E9EFE6",
        peach: "#EE9A72",
        "peach-tint": "#FBE6DA",
        // Legacy tokens — kept while existing pages await Phase 5 restyle
        teal: { DEFAULT: "#1a6b6b", dark: "#154f4f" },
        offwhite: "#faf8f5",
        charcoal: "#1a1a1a",
        muted: "#555555",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
