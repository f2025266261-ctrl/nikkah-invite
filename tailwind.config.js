/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    },
    extend: {
      colors: {
        blush: '#F4D9D6',
        'deep-blush': '#EBC4C1',
        cream: '#FBF3EA',
        ivory: '#F4EADB',
        crimson: {
          DEFAULT: '#8A2640',
          deep: '#6E1F34',
        },
        'rose-crimson': '#9C2F4B',
        gold: {
          DEFAULT: '#B8935A',
          light: '#D9B877',
          pale: '#F5E4BE',
        },
        'dusty-rose': '#C98B98',
        mauve: '#B06B7E',
        plum: '#7A4455',
        'rose-gold': '#C8998A',
        champagne: '#E8CFC0',
        mulberry: {
          DEFAULT: '#7A3F52',
          deep: '#5A2B3B',
        },
        sage: '#7F8A63',
      },
      fontFamily: {
        names: ['"Great Vibes"', 'cursive'],
        label: ['"Cormorant SC"', 'serif'],
        heading: ['"Cormorant SC"', 'Cinzel', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
        arabic: ['Amiri', 'serif'],
      },
      boxShadow: {
        'panel': '0 20px 40px -15px rgba(122, 68, 85, 0.08), 0 0 0 1px rgba(200, 153, 138, 0.2)',
        'panel-lg': '0 25px 50px -12px rgba(122, 68, 85, 0.12), 0 0 25px 1px rgba(200, 153, 138, 0.15)',
        'crimson-panel': '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(184, 147, 90, 0.35)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'diya-flame': {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)' },
          '50%': { transform: 'scale(1.08, 0.94) rotate(1.5deg)' },
        },
        'diya-glow': {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.12)' },
        },
        'fairy-twinkle': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite ease-in-out',
        'diya-flame': 'diya-flame 1.8s infinite ease-in-out',
        'diya-glow': 'diya-glow 2.2s infinite ease-in-out',
        'fairy-twinkle': 'fairy-twinkle 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
