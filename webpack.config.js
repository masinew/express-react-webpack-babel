const path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');

const TARGET = process.env.npm_lifecycle_event;

var common = {
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
          'css-loader?sourceMap=true&module=true',
          'sass-loader',
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.Tether": 'tether'
    })
  ],
  postcss: function() {
    return [autoprefixer({
      browsers: ['last 3 versions']
    })];
  }
}

if (TARGET === 'react-dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}
