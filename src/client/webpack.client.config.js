const path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');
var config = require('../common/config/dev');

const TARGET = process.env.npm_lifecycle_event;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${config.server.host}:${config.server.port}`,
    'webpack/hot/only-dev-server',
    './src/client/client-app.js'
  ],
  output: {
    path: path.join(__dirname, 'src', 'server', 'public', 'assets', 'js'),
    publicPath: 'http://localhost:4000/assets/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&babelrc=fales'
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
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      },
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.Tether": 'tether',
      alertify: "alertifyjs"
    })
  ],
  postcss: function() {
    return [autoprefixer({
      browsers: ['last 3 versions']
    })];
  },
  devServer: {
    hot: true,
    inline: false,
    historyApiFallback: true,
    contentBase: 'static',
    port: config.server.port
  }
}
