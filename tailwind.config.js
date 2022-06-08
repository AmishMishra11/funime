module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "400px",

      md: "547px",

      lg: "768px",

      xl: "1024px",

      xxl: "1680px",
    },
    extend: {
      colors: {
        primaryLight: "#D8B4FE",
        primaryDark: "#9333EA",
        secondaryLight: "#FFFFFF",
        secondaryDark: "#F8FAFC",
        darkLight: "#1E293B",
        darkDark: "#0F172A",
      },
    },
  },
  plugins: [],
};
