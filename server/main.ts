import {port, dbUrl} from '../config'
import * as Koa from 'koa'
import {pgp} from './pg'
import * as KoaRouter from 'koa-router'

if (process.env.OPBEAT_APP_ID) {
  var opbeat = require('opbeat').start()
}

let app = new Koa()
let db = pgp(dbUrl)
let router = new KoaRouter()

router.get('/', async ctx => {
  ctx.body = (await db.one('SELECT uuid_generate_v4();')).uuid_generate_v4
})

app.use(router.routes())
app.use(router.allowedMethods())
if (opbeat) {
  app.use(async (ctx, next) => {
    opbeat.setTransactionName(ctx.request.method + ' ' + (ctx as any)._matchedRoute)
  })
}

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
