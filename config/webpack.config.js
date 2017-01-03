let path = require('path')
let webpack = require('webpack')

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../web'),
  entry: {
    vendor: './vendor',
    polyfills: './polyfills'
  },
  output: {
    filename: 'build/[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    noParse: /\.min\.js/,
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
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
    new webpack.NamedModulesPlugin()
  ]
}
