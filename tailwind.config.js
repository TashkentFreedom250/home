/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        serif:   ['Playfair Display', 'serif'],
        body:    ['Libre Baskerville', 'serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      colors: {
        paper:       '#F2EDE1',
        'paper-card':'#FDFAF5',
        'paper-dark':'#E8E2D2',
        'paper-mid': '#DDD7C8',
        ink:         '#1A1510',
        'ink-light': '#4A3F33',
        'ink-muted': '#7A6B5A',
        crimson:     '#C8293C',
        navy:        '#1B3A6B',
        gold:        '#C8891A',
      },
    },
  },
  plugins: [],
}
