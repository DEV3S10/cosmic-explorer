/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          bg: '#0B0C10',
          card: '#1F2833',
          teal: '#45A29E',
          text: '#C5C6C7',
          glow: '#66FCF1',
          accent: '#F5B700',
        }
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],  // futuristic headings
        body: ['"Exo 2"', 'sans-serif'],         // clean readable text
      },
      boxShadow: {
        glow: '0 0 20px rgba(102, 252, 241, 0.4)',
        'glow-lg': '0 0 40px rgba(102, 252, 241, 0.6)',
        accent: '0 0 20px rgba(245, 183, 0, 0.4)',
      },
    },
  },
  plugins: [],
}