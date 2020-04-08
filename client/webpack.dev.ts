import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
});

const config: webpack.Configuration = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  plugins: [new webpack.HotModuleReplacementPlugin(), htmlPlugin],
};

export default config;
