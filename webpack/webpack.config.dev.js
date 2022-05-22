const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge.merge(common, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    allowedHosts: ["localhost", ".gitpod.io"],
  },
  devtool: "eval-cheap-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js",
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { url: false } },
          "sass-loader",
        ],
      },
    ],
  },
});
