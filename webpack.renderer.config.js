const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/renderer/styles/theme'),
  varFile: path.join(__dirname, './src/renderer/styles/theme/variables.less'),
  mainLessFile: path.join(__dirname, './src/renderer/styles/theme/index.less'),
  themeVariables: [
    '@primary-color',
    // '@body-background',
    // '@component-background',
    // '@icon-color-hover',
    // '@heading-color',
    // '@text-color',
    // '@text-color-secondary',
    // '@border-color-base',
    // '@border-style-base',
    // '@layout-body-background',
    // '@layout-header-background',
    // '@layout-sider-background',
    // '@layout-trigger-background',
    // '@disabled-color',
    // '@disabled-color-dark',
    // '@outline-blur-size',
    // '@background-color-light',
    // '@background-color-base',
    // '@item-hover-bg',
    // '@shadow-color',
    // '@badge-text-color',
    // '@card-actions-background',
    // '@card-shadow',
    // '@avatar-bg',
  ],
  indexFileName: 'index.html',
};

module.exports = merge(baseConfig, {
  target: 'electron-renderer',
  entry: {
    app: ['@babel/polyfill', './src/renderer/app.tsx'],
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
            '@babel/preset-react',
          ],
          plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
        },
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
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              localsConvention: 'camelCaseOnly',
            },
          },
        ],
        exclude: /\.global\.css$/,
      },
      {
        test: /\.global\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|eot|ttf|woff|woff2)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin(),
    new AntDesignThemePlugin(options),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});
