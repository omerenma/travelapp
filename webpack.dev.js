const path = require('path');
const HtmlWebpackPugin = require('html-webpack-plugin');

const dist = '/dist';
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/client/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Client',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPugin({
      template: 'src/client/views/index.html',
      filename: './index.html',
    }),
  ],
};
