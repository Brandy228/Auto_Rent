// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      keyframes: {
        borderRotate: {
          '0%': { 
            borderImage: 'conic-gradient(from 0deg at 50% 50%, blue 0deg, transparent 60deg, transparent 300deg, blue 360deg) 1'
          },
          '100%': { 
            borderImage: 'conic-gradient(from 360deg at 50% 50%, blue 0deg, transparent 60deg, transparent 300deg, blue 360deg) 1'
          }
        }
      },
      animation: {
        'border-run': 'borderRotate 2s linear infinite',
      }
    }
  }
}