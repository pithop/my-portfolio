/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#030712',    // Deeper dark (gray-950)
        light: '#fafafa',   // Clean neutral light
        primary: '#3b82f6', // Blueprint blue
        accent: '#8b5cf6',  // Violet accent for gradients
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
