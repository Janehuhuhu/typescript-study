const path = require('path')
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.ts'),
  output: {
    path: path.join(__dirname, 'dist')
  },
  devtool: false,
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   use: {
      //     loader: 'ts-loader'
      //   }
      // }
      // {
      //   test: /\.ts$/,
      //   use: {
      //     loader: 'esbuild-loader',
      //     options: {
      //       loader: 'ts',
      //       target: 'es2015'
      //     }
      //   }
      // }
      {
        test: /\.ts$/,
        use: {
          loader: 'swc-loader'
        }
      }
    ]
  }
}