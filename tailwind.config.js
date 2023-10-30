/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans"],
      },
      colors: {
        main: "var(--main-bg-color)",
        secondary: "var(--secondary-color)",
        primary: "var(--primary-color)",
        tetiary: "var(--tetiary-color)",
        border: "var(--border-default)",
        legend: "var(--legend-color)",
      },
    },
  },
  plugins: [],
};
