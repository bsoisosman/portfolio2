module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // <- use this instead of just 'tailwindcss'
    require('autoprefixer')
  ]
};
