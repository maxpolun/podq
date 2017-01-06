let path = require('path')
let webpack = require('webpack')
let fs = require('fs')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let extractCss = new ExtractTextPlugin('styles-[contenthash].css')

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
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.s?css$/,
        loader: extractCss.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: 'node_modules'
      }
    ]
  },
  plugins: [
    extractCss,
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    }),
    new webpack.NamedModulesPlugin(),
    function() {
      this.plugin("done", stats => {
        fs.writeFileSync(
          path.join(__dirname, "..", "web/build/stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
}
