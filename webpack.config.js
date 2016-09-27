var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query:
          {
            presets:['es2015', 'react']
          }
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'css' ]
      }
    ]
  }
}
