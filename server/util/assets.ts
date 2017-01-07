import {assetsPath, useWebpackDevServer} from '../../config'

let assetsStats
if (!useWebpackDevServer) {
  assetsStats = require('../../web/build/stats.json')
}

function itemOrFirst (subject) {
  if (subject instanceof Array) {
    return subject[0]
  }
  return subject
}

export function jsTag (name: string): string {
  let filename = assetsStats ?
                  itemOrFirst(assetsStats.assetsByChunkName[name]) :
                  name + '.bundle.js'
  return `<script src="${assetsPath}${filename}"></script>`
}

export function cssTag (name: string): string {
  if (useWebpackDevServer) { return '' }
  // at least currently the stylesheet is always the second item
  let filename = assetsStats.assetsByChunkName[name][1]
  return `<link rel="stylesheet" href="${assetsPath}${filename}">`
}
