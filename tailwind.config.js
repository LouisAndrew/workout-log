module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["'Oswald'", 'sans-serif'],
      body: ["'Montserrat'", 'sans-serif']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      // padding
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active'],
      padding: ['hover', 'focus', 'active'],
      maxWidth: ['group-hover'],
      margin: ['even', 'first']
    },
  },
  plugins: [],
};
