const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {index: path.resolve(__dirname, "fe-src", "index.js")},
  output: {
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target:
          'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "fe-src", "index.html")
    })
  ]
};
