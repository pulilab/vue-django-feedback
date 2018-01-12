module.exports = (options, req) => ({
  entry: './src/index.js',
  vendor: false,
  filename: {
    js: 'django-feedback.js',
    css: 'style.css',
    images: 'assets/images/[name].[ext]',
    fonts: 'assets/fonts/[name].[ext]',
    chunk: '[id].chunk.js'
  },
  devServer: {
    proxy: 'http://localhost/api'
  }
});
