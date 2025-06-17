/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#85F629",
        "primary-dull": "#75DD24", 
        "backgroundColor_1": "#000000",
        "backgroundColor_2": "#0A0A0A",
        "gray_1": "#D1D5DB",
        "gray_2": "#9CA3AF",
      },
      fontFamily: {
        "Montserrat": ["Montserrat", "sans-serif"],
        "Poppins": ["Poppins","sans-serif"],
        "Inter": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}