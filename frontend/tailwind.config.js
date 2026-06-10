const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, 'app/**/*.{js,ts,jsx,tsx}').replace(/\\/g, '/'),
    path.join(__dirname, 'components/**/*.{js,ts,jsx,tsx}').replace(/\\/g, '/'),
    path.join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}').replace(/\\/g, '/'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3a4887",
          accent: "#efc94a",
          white: "#ffffff",
          light: "#f5f6fa",
        }
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'Arial', 'Helvetica', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 90s linear infinite',
        'fade-up': 'fade-up 0.6s ease both',
        'fade-in': 'fade-in 0.2s ease both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(2rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      }
    }
  },
  plugins: [],
}
