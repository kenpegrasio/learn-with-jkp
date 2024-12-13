/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{ts,tsx,html,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        customWhite: "#ffffff",
        customBlue: "#0092d5",
      },
      backgroundImage: {
        'tech-background': "url('/tech-background.jpg')"
      }
    },
  },
  plugins: [],
};
