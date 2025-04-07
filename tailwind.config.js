module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customLightBlue: "#01B4E4",
        customDarkBlue: "#032541",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "Arial", "sans-serif"],
      },
      boxShadow: {
        cardShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
