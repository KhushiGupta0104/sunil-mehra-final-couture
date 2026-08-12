/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.7rem', { lineHeight: '1rem' }],
        'sm': ['0.8rem', { lineHeight: '1.25rem' }],
        'base': ['0.9rem', { lineHeight: '1.5rem' }],
        'lg': ['1rem', { lineHeight: '1.75rem' }],
        'xl': ['1.125rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.3rem', { lineHeight: '2rem' }],
        '3xl': ['1.6rem', { lineHeight: '2.25rem' }],
        '4xl': ['2rem', { lineHeight: '2.5rem' }],
        '5xl': ['2.6rem', { lineHeight: '1' }],
        '6xl': ['3.25rem', { lineHeight: '1' }],
        '7xl': ['4rem', { lineHeight: '1' }],
        '8xl': ['5.25rem', { lineHeight: '1' }],
        '9xl': ['7rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
}
