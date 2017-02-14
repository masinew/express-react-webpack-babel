const path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge');

const config = require('../common/config/devServer');
const mainWebpackConfig = require('../../webpack.config');

const devServer = `${config.admin.protocal}://${config.admin.host}:${config.admin.port}`;

module.exports = merge(mainWebpackConfig, {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${devServer}`,
    'webpack/hot/only-dev-server',
    './src/admin/admin-app.js'
  ],
  output: {
    publicPath: `${devServer}/assets/js/`
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
    port: config.admin.port
  }
})
