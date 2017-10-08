const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.ts$/,
        use: [
          {
              loader: 'awesome-typescript-loader?'
          },
          {
              loader: 'angular2-template-loader'
          }
        ]
      }, {
        test: /\.css$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      }, {
        test  : /\.png$/,
        loader: 'url-loader',
        query : {mimetype: 'image/png'}
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".js", ".css", ".html" ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, 'src')
    ),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
};