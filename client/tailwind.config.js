/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#0F1D32',
        },
        sky: {
          DEFAULT: '#4A90D9',
          light: '#5BA0E9',
        },
        orange: {
          DEFAULT: '#D4702A',
        },
        gold: {
          DEFAULT: '#D4A048',
        },
        green: {
          DEFAULT: '#66BB6A',
        },
      },
      fontFamily: {
        primary: ['DM Sans', 'Segoe UI', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'DM Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        full: '100px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.2)',
        elevated: '0 20px 60px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
