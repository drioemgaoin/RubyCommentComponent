var path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders')
var glob = require("glob");

const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = module.exports = {
  context: __dirname,
  entry: glob.sync("./app/assets/components/react/**/*.es6.jsx"),
  output: {
    path: __dirname + "/app/assets/javascripts",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: { presets:['es2015', 'react'] }
      },
      {
        test: /\.scss$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ])
      }
    ],
  },
  sassLoader: {
    sourceMap: true
  }
};
