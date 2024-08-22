/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-gradient-mask-image')]
}

