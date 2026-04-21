/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        bebas:   ['Bebas Neue', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#010810',
          900: '#020c1b',
          800: '#071428',
          700: '#0d2040',
          600: '#122855',
        },
        steel: '#7090a8',
        cream: '#e8e3d5',
        'brand-red':  '#c0392b',
        'brand-gold': '#d4a830',
        'brand-blue': '#2563a8',
      },
    },
  },
  plugins: [],
}
