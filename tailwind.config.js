/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        success: '#10B981',
        danger: '#EF4444',
        green: {
          500: '#10B981',
        },
        red: {
          500: '#EF4444',
        },
        gray: {
          500: '#6B7280',
        },
      },
    },
  },
  plugins: [],
}
