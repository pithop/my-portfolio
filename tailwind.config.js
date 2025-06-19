/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Make sure dark mode is enabled
  theme: {
    extend: {
      colors: {
        dark: '#0f172a',    // Your custom dark color
        light: '#f8fafc',   // Your custom light color
        primary: '#6366f1', // Your custom primary color
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
