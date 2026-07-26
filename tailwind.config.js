/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F766E", // Primary Teal/Cyan
          hover: "#0d6962",
        },
        "deep-slate": "#0F172A", // Deep Slate
        "soft-mint": "#F0FDF4", // Soft Mint background accents
      },
    },
  },
  plugins: [],
};
