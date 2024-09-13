/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inika', 'sans-serif'],
        urbanist: ['Urbanist', 'Inika']
      },
      colorS: {
        pale: "rgba(151, 71, 255, 0.6)",
        purple: 'rgba(151, 71, 255, 0.6)',
      },
    },
  },
  plugins: [],
}

