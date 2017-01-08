global.Promise = require('bluebird')
import 'core-js/es7/reflect'
require('zone.js/dist/zone')

if (process.env !== 'production') {
  Error['stackTraceLimit'] = Infinity
  require('zone.js/dist/long-stack-trace-zone')
}
