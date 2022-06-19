module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
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
        secondaryDark: "#F1F5F9",
        nightLight: "#202326",
        nightDark: "#121212",
        nightInput: "#3B3B3B",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
