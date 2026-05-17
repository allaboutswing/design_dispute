import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#152033",
        brand: {
          50: "#eef4ff",
          100: "#dbe7ff",
          500: "#315efb",
          700: "#1e40af"
        },
        sand: "#f5f1e8",
        accent: "#9d6b2f",
        success: "#126b39",
        warning: "#8a6116",
        danger: "#8f2636"
      },
      boxShadow: {
        card: "0 12px 30px rgba(21, 32, 51, 0.08)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(21,32,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(21,32,51,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
