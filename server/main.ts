import {port, dbUrl} from '../config'
import * as Koa from 'koa'
import {pgp} from './pg'

if (process.env.OPBEAT_APP_ID) {
  var opbeat = require('opbeat').start()
}

let app = new Koa()
let db = pgp(dbUrl)

app.use(async ctx => {
  ctx.body = (await db.one('SELECT uuid_generate_v4();')).uuid_generate_v4
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
