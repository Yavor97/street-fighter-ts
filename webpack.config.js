const path = require('path');

module.exports = {
  entry: './index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
      ,{
          test: /\.css$/,
          use: ["style-loader", "css-loader"] 
      }
    ]
  },
  devServer: {
    inline: true
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  }
};