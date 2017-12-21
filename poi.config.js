module.exports = (options, req) => ({
  entry: './src/index.js',
  vendor: false,
  extractCSS: true,
  filename: {
    js: 'django-feedback.js',
    css: 'style.css',
    images: 'assets/images/[name].[ext]',
    fonts: 'assets/fonts/[name].[ext]',
    chunk: '[id].chunk.js'
  }
});
