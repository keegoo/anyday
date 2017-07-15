var webpack = require('webpack');
 
module.exports = {
  entry: './src/anyday.js',
  output: {
    filename: './src/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  node: {
    fs: false,
    tls: false,
    net: false
  }
};
