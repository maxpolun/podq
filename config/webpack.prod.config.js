let path = require('path')
let webpack = require('webpack')

let ExtractTextPlugin = require('extract-text-webpack-plugin')
let CompressionPlugin = require('compression-webpack-plugin')
let fs = require('fs')

let extractCss = new ExtractTextPlugin('[name]-[contenthash].bundle.css')

let config = require('./webpack.base.config')
config.output.filename = '[name]-[hash].bundle.js'
config.output.publicPath = '/assets/'
config.module.rules.push({
  test: /\.s?css$/,
  loader: extractCss.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader!sass-loader'
  })
})
config.plugins.push(extractCss)
config.plugins.push(new CompressionPlugin())
config.plugins.push(function () {
  this.plugin("done", stats => {
    fs.writeFileSync(
      path.join(__dirname, "..", "web/build/stats.json"),
      JSON.stringify(stats.toJson()));
  });
})
config.plugins.push(new webpack.optimize.UglifyJsPlugin())
config.devtool = 'sourcemap'

module.exports = config
