/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          500: '#255F38',
          600: '#1d4829',
          700: '#15381f'
        }
      }
    },
  },
  plugins: [],
}