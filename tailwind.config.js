/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rose: { DEFAULT: '#f43f5e', light: '#fb7185' },
        gold: { DEFAULT: '#f59e0b', light: '#fbbf24' },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
        great: ['Great Vibes', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(2deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
