const path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var config = require('../common/config/devServer');
const mainWebpackConfig = require('../../webpack.config');

const TARGET = process.env.npm_lifecycle_event;

const devServer = `${config.protocal}://${config.host}:${config.port}`;

module.exports = merge(mainWebpackConfig, {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${devServer}`,
    'webpack/hot/only-dev-server',
    './src/client/ui/style/Home.scss',
    './src/client/client-app.js'
  ],
  output: {
    publicPath: 'http://localhost:4000/assets/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap=true&module=true&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?outputStyle=expanded&sourceMap=true',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: false,
    historyApiFallback: true,
    contentBase: 'static',
    port: config.port
  }
})
