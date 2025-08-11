/* eslint-disable */
const webpack = require("webpack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    app: __dirname + "/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      // Use a local tsconfig that doesn't constrain rootDir to src
      // This avoids TS picking root tsconfig for the example app
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
          },
        },
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
};
