var path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders')

var config = module.exports = {
  context: __dirname,
  entry: [
    __dirname + '/app/assets/components/react/display-comment/display-comment.es6.jsx',
    __dirname + '/app/assets/components/react/add-comment/add-comment.es6.jsx'
  ],
  output: {
    path: __dirname + "/app/assets/javascripts",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
        test: /\.(scss|sass|css)$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'sass-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }
    ],
  },
};
