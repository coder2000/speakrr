import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
});

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
  plugins: [new webpack.HotModuleReplacementPlugin(), htmlPlugin],
};

export default config;
