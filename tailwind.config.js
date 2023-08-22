/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          600: "#b5179e",
          500: "#c71aae",
        },
      },
    },
  },
  plugins: [],
};
