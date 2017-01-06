let path = require('path')
require('ts-node').register({
  project: path.resolve('./server/tsconfig.json')
})

require('./server/main')
