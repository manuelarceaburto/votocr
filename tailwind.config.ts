import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Costa Rican flag colors
        'cr-blue': '#002b7f',
        'cr-red': '#ce1126',
        'cr-white': '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
