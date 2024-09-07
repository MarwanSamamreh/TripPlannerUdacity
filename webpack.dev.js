const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/view/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp("/api/.*"),
          handler: "NetworkFirst",
        },
        {
          urlPattern: new RegExp("/static/.*"),
          handler: "CacheFirst",
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    allowedHosts: "all",
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      publicPath: "/",
    },
  },
};
