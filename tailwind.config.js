/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Public Sans', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        mono:  ['Source Code Pro', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        navy: {
          darkest: '#0b1e3f',
          darker:  '#162e51',
          dark:    '#1a4480',
          DEFAULT: '#005ea2',
          light:   '#73b3e7',
          lighter: '#d9e8f6',
          lightest:'#dfe1e2',
        },
        'gov-red': {
          darker:  '#8b0a03',
          dark:    '#b50909',
          DEFAULT: '#d83933',
          light:   '#f2938c',
          lighter: '#f8dfe2',
        },
        'gov-green': {
          dark:    '#00513e',
          DEFAULT: '#00a91c',
          light:   '#ecf3ec',
        },
        'gov-gold': {
          dark:    '#936f38',
          DEFAULT: '#ffbe2e',
          light:   '#faf3d1',
        },
        'gov-info': {
          dark:    '#2e6276',
          DEFAULT: '#00bde3',
          light:   '#e7f6f8',
        },
        'gov-gray': {
          90:    '#1b1b1b',
          80:    '#2d2e2f',
          70:    '#3d4551',
          60:    '#565c65',
          50:    '#757575',
          30:    '#a9aeb1',
          20:    '#c9c9c9',
          10:    '#e6e6e6',
          5:     '#f0f0f0',
          cool1: '#f7f9fa',
          cool2: '#edeff0',
        },
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
      },
      boxShadow: {
        1: '0 1px 4px 0 rgba(0,0,0,0.10)',
        2: '0 4px 8px 0 rgba(0,0,0,0.08)',
        focus: '0 0 0 2px #2491ff',
      },
    },
  },
  plugins: [],
}
