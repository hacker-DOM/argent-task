/* global require __dirname process module */
const R = require (`ramda`)
const webpack = require (`webpack`)
const CopyPlugin = require (`copy-webpack-plugin`)
const HtmlWebPackPlugin = require (`html-webpack-plugin`)
const ErrorOverlayPlugin = require (`error-overlay-webpack-plugin`)
const path = require (`path`)

const rootPath = dir => path.resolve (__dirname, dir)
const NODE_ENV = process.env.NODE_ENV
const PRODUCTION_BASENAME = `/argent-task`

const common = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: `babel-loader`,
    }],
  },
  output: {
    filename: `[hash].js`,
    path: rootPath (`build`),
  },
  plugins: [
    new HtmlWebPackPlugin ({
      template: rootPath (`public/index.html`)
    }),
    new CopyPlugin ([{
      from: rootPath (`public`)
    }]),
  ],
  resolve: {
    alias: {
      public: rootPath (`public`),
      components: rootPath (`src/components`),
      common: rootPath (`src/common`)
    }
  },
}

const develop = {
  mode: `development`,
  devtool: `cheap-module-source-map`,
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: `/`,
  },
  plugins: [
    new ErrorOverlayPlugin (),
    new webpack.DefinePlugin ({
      BASENAME: JSON.stringify (`/`),
      NODE_ENV: JSON.stringify (NODE_ENV),
    }),
  ],
}

const production = {
  mode: `production`,
  output: {
    publicPath: PRODUCTION_BASENAME,
    // publicPath: `/`,
  },
  plugins: [
    new webpack.DefinePlugin ({
      BASENAME: JSON.stringify (PRODUCTION_BASENAME),
      NODE_ENV: JSON.stringify (NODE_ENV),
    }),
  ]
}

const makeConfigs = R.mergeDeepWith (R.concat, common)

console.log (`Running webpack with NODE_ENV: ${NODE_ENV}.`)

const config = (
  NODE_ENV === `production`
    ? makeConfigs (production)
    : makeConfigs (develop)
)

module.exports = config