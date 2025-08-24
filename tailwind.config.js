/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // zIndex: {
        //   "-1": "-1",
        // },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeDown: {
          from: { transform: "translateY(-10%)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s linear",
        fadeDown: "fadeDown 0.25s linear",
      },
    },
  },
  plugins: [],
};
