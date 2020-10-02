const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
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
    publicPath: "",
    filename: "index.min.js",
    library: "handleIt",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: /./,
        },
      }),
    ],
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
