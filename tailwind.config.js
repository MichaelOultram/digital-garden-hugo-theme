module.exports = {
  content: [
    "./layouts/**/*.html",
    "./assets/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
}
