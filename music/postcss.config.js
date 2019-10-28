module.exports = {
  plugins: {
    autoprefixer: {
      "postcss-px-to-viewport": {
        viewportwidth: 320,
        viewportheight: 568,
        unitPrecision: 5,
        viewportUnit: 'vw',
        minPixelvalue: 1,
        mediaQuery: false
      }
    }
  }
}