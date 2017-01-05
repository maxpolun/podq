let opbeat: any | null = null
if (process.env.OPBEAT_APP_ID) {
  opbeat = require('opbeat').start()
}

global.Promise = require('bluebird')

import {join} from 'path'
import {port, dbUrl} from '../config'
import * as Koa from 'koa'
import {db} from './pg'
import * as KoaRouter from 'koa-router'
import * as koaLogger from 'koa-logger'
import * as koaStatic from 'koa-static-cache'
import * as koaConvert from 'koa-convert'

declare module 'koa' {
    interface Request {
        body: any
    }
}

let app = new Koa()
let router = new KoaRouter()

app.use(koaLogger())
app.use(koaConvert(koaStatic(join(__dirname, '..', 'web', 'build'), {
  gzip: true,
  usePrecompiledGzip: true,
  prefix: '/assets'
})))

import {uuid2short} from './util/shortId'
router.get('/', async ctx => {
  ctx.body = uuid2short((await db.one('SELECT uuid_generate_v4();')).uuid_generate_v4)
})

import {apiRouter} from './api'
router.use(apiRouter.routes())
router.use(apiRouter.allowedMethods())

app.use(router.routes())
app.use(router.allowedMethods())

if (opbeat) {
  app.use(async (ctx, next) => {
    opbeat.setTransactionName(ctx.request.method + ' ' + (ctx as any)._matchedRoute)
    await next
  })
}

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
