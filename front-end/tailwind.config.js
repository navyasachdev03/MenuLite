/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-in-out',
        'fadeIn': 'fadeIn 2s ease-in-out',
        'fadeInSlow': 'fadeIn 2.5s ease-in-out',
      },
    },
    fontFamily: {
      Signika: ["Signika Negative", "sans-serif"],
    },
    fontWeight: {
      "extra-light": 200,
      light: 300,
      normal: 400,
      medium: 500,
      "semi-bold": 600,
      bold: 700,
      "extra-bold": 800,
    },
  },
  plugins: [],
}
