/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono:  ['Source Code Pro', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        space: {
          950: '#020917',
          900: '#05142a',
          800: '#0b1e3f',
          700: '#0d2347',
          600: '#162e51',
        },
        'gov-red':   '#d83933',
        'acc-blue':  '#2491ff',
        'acc-green': '#00a91c',
        'acc-gold':  '#ffbe2e',
      },
      boxShadow: {
        'glow-blue':  '0 0 30px rgba(36,145,255,0.2)',
        'glow-red':   '0 0 30px rgba(216,57,51,0.22)',
        'glow-green': '0 0 30px rgba(0,169,28,0.2)',
        'glow-gold':  '0 0 30px rgba(255,190,46,0.2)',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}
