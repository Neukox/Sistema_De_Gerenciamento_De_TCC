export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F2C67", // Azul escuro
        secondary: "#F3C50D", // Amarelo
        neutral: "#fffbef", // Âmbar
        historico: "#ebbb13",
        historicoatividades: "#faf9e7",
      },
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
      },
      container: {
        xs: "28rem", // 448px
      },
      maxWidth: {
        "8xl": "90rem", // 1440px
        "9xl": "100rem", // 1600px
      },
      aria: {
        invalid: "invalid='true'",
      },
    },
  },
  plugins: [],
};
