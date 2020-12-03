const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
  },
  //dev
  devServer: {
    port: 9000,
    publicPath: '/build/', //matches the path for the production output
    proxy: {
      '/**': {
        target: 'http://localhost:3001' //will this affect web socket ports?
      }
    }
  },
  module: {
    rules: [
      // list of rules include objects with test and use properties
      //babel processes jsx files
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //preset-env is overall environment, passing react narrows down scope of environment for transpilations
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      //style loaders
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings (third)
          'style-loader',
          // Translates CSS into CommonJS (second)
          'css-loader',
          // Compiles Sass to CSS (first)
          'sass-loader',
        ],
      },
      //extracts css for faster loading
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ]
};