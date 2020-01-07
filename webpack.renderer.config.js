const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  target: 'electron-renderer',
  entry: {
    app: ['@babel/polyfill', './src/renderer/app.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            ['@babel/preset-env', { targets: { browsers: 'last 2 versions ' } }],
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
          plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              localsConvention: 'camelCaseOnly'
            }
          }
        ],
        exclude: /\.global\.css$/
      },
      {
        test: /\.global\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg|eot|ttf|woff|woff2)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/renderer/**/*']
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
