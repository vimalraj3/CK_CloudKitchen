/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: `'Poppins', sans-serif`,
        para: `'Nunito', sans-serif`
      }
    },
  },
  plugins: [],
}

