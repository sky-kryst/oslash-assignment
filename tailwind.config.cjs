/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { 100: "28rem" },
      keyframes: {
        pop: {
          "0%": { bottom: "-64px" },
          "50%": { bottom: "20px" },
          "100%": { bottom: "-64px" },
        },
      },
      animation: {
        toast: "pop 4s ease-in-out",
      },
    },
  },
  plugins: [],
};
