/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#070709',
        surface: '#0E0E12',
        elevated: '#15151B',
        neon: {
          cyan: '#00F0FF',
          violet: '#7000FF',
          emerald: '#00FF88',
          amber: '#FFB800',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        tech: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.25em',
        ultra: '0.4em',
      },
    },
  },
  plugins: [],
}
