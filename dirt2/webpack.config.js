const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
  fallback: {
    timers: require.resolve("timers-browserify")
  }
}

  // Other configuration settings...
};
