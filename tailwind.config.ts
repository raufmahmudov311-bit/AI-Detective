import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cork: {
          DEFAULT: "#4A3423",
          dark: "#3A2919",
          darker: "#241B12",
        },
        paper: {
          DEFAULT: "#EDE3CC",
          light: "#F5EFDD",
          dark: "#D9CBA6",
        },
        ink: {
          DEFAULT: "#2A2118",
          light: "#5C4E3E",
        },
        blood: {
          DEFAULT: "#9C2B22",
          bright: "#B0342B",
        },
        brass: "#C79A3E",
      },
      fontFamily: {
        display: ["'Special Elite'", "cursive"],
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        cork: "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.15) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.15) 0, transparent 40%), radial-gradient(circle at 50% 90%, rgba(0,0,0,0.12) 0, transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
