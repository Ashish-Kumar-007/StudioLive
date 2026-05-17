/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f0db',
        surface: '#e1d9bc',
        'surface-light': '#acbac4',
        primary: '#30364f',
        dim: '#505870',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #30364f, #4a5378)',
      }
    },
  },
  plugins: [],
}

