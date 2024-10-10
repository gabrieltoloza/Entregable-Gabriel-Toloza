/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/views/**/*.handlebars", 
      "./public/**/*.html"
  ],
  theme: {
      extend: {},
  },
  plugins: [
      require('daisyui')
  ],
};
