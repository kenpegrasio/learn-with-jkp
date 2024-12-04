/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        customWhite: "#f4faff",
        customBlue: "#0092d5",
      },
      backgroundImage: {
        'tech-background': "url('/tech-background.jpg')"
      }
    },
  },
  plugins: [],
};
