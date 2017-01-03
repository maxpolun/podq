let path = require('path')
require('ts-node').register({
  project: path.resolve('tsconfig.server.json')
})

require('./server/main')
