const path = require('path')

module.exports = {
  entry: './react-ui/src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'react-ui/build'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'react-ui/build'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
