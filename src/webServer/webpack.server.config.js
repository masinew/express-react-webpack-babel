const path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const mainWebpackConfig = require('../../webpack.config');

const TARGET = process.env.npm_lifecycle_event;

module.exports = merge(mainWebpackConfig, {
  devtool: "source-map",
  entry: [
    './src/client/server-app.js'
  ],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    publicPath: '/assets/js/',
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&babelrc=false'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap=true&module=true&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader?outputStyle=expanded&sourceMap=true!postcss-loader")
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new ExtractTextPlugin("css/style.css")
  ]
})
