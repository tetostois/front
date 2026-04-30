/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#22c55e',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
