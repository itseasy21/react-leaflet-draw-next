/* eslint-disable */
const webpack = require("webpack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    app: __dirname + "/index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js",
    publicPath: "http://localhost:8000/dist",
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8001,
    open: true,
    static: {
      directory: __dirname,
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
