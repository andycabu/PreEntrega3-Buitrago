/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 0 30px rgba(0, 0, 0, 0.7);",
        custom: "-1rem 0 3rem #000",
      },
      colors: {
        personalized: "rgb(161 99 201 / 86%)",
        personalized2: "rgb(119 179 89)",
      },
    },
  },

  plugins: [],
};
