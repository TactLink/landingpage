/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3a4887", // New primary blue
          accent: "#efc94a", // New accent yellow
          white: "#ffffff", // Pure white
          light: "#f5f6fa", // Subtle light grey/off-white
        }
      }
    }
  },
  plugins: [],
}

