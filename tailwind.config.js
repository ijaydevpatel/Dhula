/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark"],   // 👈 explicit selector
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};
