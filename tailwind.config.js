/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#07090E",
        surfaceDark: "#0E121A",
        goldPrimary: "#D4AF37",
        saffronPrimary: "#FF7E36",
        amberPrimary: "#FB8500",
        textDim: "#A0B2C6",
        textLight: "#F0F4F8",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Outfit'", "sans-serif"],
      },
      boxShadow: {
        goldGlow: "0 0 25px rgba(212, 175, 55, 0.35)",
        saffronGlow: "0 0 25px rgba(255, 126, 54, 0.4)",
        glassGlow: "inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}
