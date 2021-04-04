module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["'Oswald'", 'sans-serif'],
      body: ["'Montserrat'", 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active']
    },
  },
  plugins: [],
};
