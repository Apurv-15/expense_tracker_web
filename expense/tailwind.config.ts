import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // Import the plugin

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'], // Enable dark mode
  content: [
    "./pages/**/*.{ts,jsx,tsx}",
    "./components/**/*.{ts,jsx,tsx}",
    "./app/**/*.{ts,jsx,tsx}",
    "./src/**/*.{ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#7E69AB",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#D6BCFA",
          foreground: "#1A1F2C",
        },
        muted: {
          DEFAULT: "#F1F0FB",
          foreground: "#1A1F2C",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate], // Use the imported plugin
};

export default config;