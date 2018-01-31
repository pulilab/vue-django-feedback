module.exports = (options, req) => ({
  entry: './src/index.js',
  vendor: false,
  sourceMap: false,
  html: options.mode === 'production' ? false : undefined,
  format: options.mode === 'production' ? 'cjs' : undefined,
  filename: {
    js: 'django-feedback.js',
    css: 'django-feedback.css',
    images: 'assets/images/[name].[ext]',
    fonts: 'assets/fonts/[name].[ext]',
    chunk: '[id].chunk.js'
  },
  devServer: {
    proxy: 'http://localhost/api'
  }
});
