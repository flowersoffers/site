import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#104B26", // Primary
          hover: "#0B351B",
          light: "#E8F4EC",
        },
        "floral-pink": {
          DEFAULT: "#E91E63", // Secondary
          hover: "#C2185B",
          light: "#FCE4EC",
        },
        marigold: {
          DEFAULT: "#F36B21", // Accent
          hover: "#D85812",
          light: "#FFF3EB",
        },
        "leaf-green": {
          DEFAULT: "#78B82A", // Supporting
          hover: "#639A22",
          light: "#F1F8E9",
        },
        "pale-ivory": "#FFF9EF",
        "muted-gray": "#68756A",

        // Aliases
        saffron: {
          500: "#F36B21",
        },
        leaf: {
          500: "#78B82A",
        },
        gold: {
          500: "#F36B21",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        hindi: ["var(--font-hind)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "floral-pattern": "url('/images/floral-bg-pattern.svg')",
        "hero-gradient":
          "linear-gradient(135deg, #fff8f0 0%, #ffddb5 50%, #fff0dc 100%)",
        "festive-gradient":
          "linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF6B35 100%)",
      },
      animation: {
        "float-petal": "floatPetal 6s ease-in-out infinite",
        "bloom": "bloom 0.5s ease-out forwards",
        "shimmer": "shimmer 1.5s infinite",
        "slide-up": "slideUp 0.4s ease-out forwards",
      },
      keyframes: {
        floatPetal: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
        },
        bloom: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "petal": "0 4px 20px rgba(255, 107, 53, 0.15)",
        "petal-hover": "0 8px 30px rgba(255, 107, 53, 0.25)",
        "card": "0 2px 15px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "petal": "60% 40% 70% 30% / 50% 60% 40% 50%",
      },
    },
  },
  plugins: [],
};

export default config;
