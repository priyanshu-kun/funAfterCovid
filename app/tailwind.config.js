module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      "20": "20rem"
     },
    backgroundColor: theme => ({
      ...theme('colors')
     }),
    extend: {
      width: {
        "_80": "80vw"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
