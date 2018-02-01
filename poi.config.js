module.exports = (options, req) => {
  const buildType = process.env.BUILD_TYPE || 'standard';
  const base = {
    entry: './src/index.js',
    sourceMap: false,
    vendor: false
  };

  const dev = {
    devServer: {
      proxy: 'http://localhost/api'
    }
  };

  const production = {
    html: false,
    library: buildType === 'lib',
    filename: {
      js: 'vue-django-feedback.js',
      css: 'vue-django-feedback.css',
      images: 'assets/images/[name].[ext]',
      fonts: 'assets/fonts/[name].[ext]',
      chunk: '[id].chunk.js'
    }
  };
  const extend = options.mode === 'production' ? production : dev;
  return {
    ...base,
    ...extend
  };
};
