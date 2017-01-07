let webpack = require('webpack')

let config = require('./webpack.base.config')

config.output.filename = '[name].bundle.js'
config.output.publicPath = 'http://localhost:8001/assets/'
config.module.rules.push({
  test: /\.s?css$/,
  loader: ['style-loader', 'css-loader', 'sass-loader']
})
config.plugins.push(new webpack.NamedModulesPlugin())

module.exports = config
