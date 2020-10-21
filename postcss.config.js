module.exports = {
  plugins: {
    autoprefixer: true,
    cssnano: false,
  }
}
// const cssnanoConfig = {
//   preset: ['default', { discardComments: { removeAll: true }, minifyFontValues: { removeQuotes: false } }]
// };

// // eslint-disable-next-line no-unused-vars
// module.exports = ({ file, options }) => {
//   return {
//     parser: options.enabled.optimize ? 'postcss-safe-parser' : undefined,
//     plugins: {
//       autoprefixer: true,
//       cssnano: options.enabled.optimize ? cssnanoConfig : false,
//     },
//   };
// };