const path = require('path');
const webpack = require('webpack');
const urlloader = require('url-loader');
const fileloader = require('file-loader');
const APP_DIR = path.resolve(__dirname, 'client');
const SERVER_DIR = path.resolve(__dirname, 'server');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client', 'webpack/hot/dev-server',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?/,
        loaders: ['react-hot', 'babel'],
        include: APP_DIR
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
    ]
  },
};
