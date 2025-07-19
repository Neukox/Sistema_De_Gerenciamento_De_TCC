export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F2C67", // Azul escuro
        secondary: "#F3C50D", // Amarelo
        neutral: "#fffbef", // Âmbar
      },
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
