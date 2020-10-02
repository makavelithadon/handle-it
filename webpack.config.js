const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { NODE_ENV, ANALYZER } = process.env;
const nodeEnv = NODE_ENV || "production";
const analyzer = ANALYZER;

module.exports = {
  mode: nodeEnv,
  entry: path.resolve(__dirname, "src"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.min.js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: analyzer ? [new BundleAnalyzerPlugin()] : [],
};
