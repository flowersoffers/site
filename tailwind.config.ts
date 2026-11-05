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
        // Brand Colors — auspicious Indian palette
        saffron: {
          50:  "#fff8f0",
          100: "#fff0dc",
          200: "#ffddb5",
          300: "#ffc480",
          400: "#ffa04a",
          500: "#FF6B35", // Primary Brand Color
          600: "#e8541e",
          700: "#c43e12",
          800: "#9e3215",
          900: "#7f2c16",
          950: "#451209",
        },
        leaf: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#2D7D46", // Secondary Brand Color
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        gold: {
          50:  "#fffef0",
          100: "#fffcd1",
          200: "#fff7a3",
          300: "#ffee6a",
          400: "#FFD700", // Accent — festive gold
          500: "#e6b800",
          600: "#b38a00",
          700: "#8a6800",
          800: "#6b5100",
          900: "#523e00",
        },
        petal: {
          50:  "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
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
