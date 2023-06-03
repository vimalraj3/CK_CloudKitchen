/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'success': '#5cb85c',
        'success-300': '#5cb83c',
        'error': '#ff3a31',
        'primary': '#ff7e8b',
        'secondary': '#f8f8f8'
      },
      fontFamily: {
        head: `'Poppins', sans-serif`,
        para: `'Nunito', sans-serif`
      }
    },
  },
  plugins: [],
}
