const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app-client.js',
  output: {
    path: path.join(__dirname, 'src', 'public', 'assets', 'js'),
    publicPath: '/assets/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  }
}
