let path = require('path')
let webpack = require('webpack')

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../web'),
  entry: {
    main: './main',
    vendor: './vendor',
    polyfills: './polyfills'
  },
  output: {
    path: path.resolve(__dirname, '../web/build'),
    chunkFilename: '[id].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: 'node_modules'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ]
}
