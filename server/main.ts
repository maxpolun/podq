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

if (opbeat) {
  app.use(async (ctx, next) => {
    try {
      await next()
    } finally {
      let transationName = ctx.request.method + ' ' + (ctx as any)._matchedRoute
      opbeat.setTransactionName(transationName)

    }
  })
}

app.use(koaConvert(koaLogger()))
app.use(koaConvert(koaStatic(join(__dirname, '..', 'web', 'build'), {
  gzip: true,
  usePrecompiledGzip: true,
  prefix: '/assets'
})))

import {apiRouter} from './api'
router.use(apiRouter.routes())
router.use(apiRouter.allowedMethods())

import {jsTag, cssTag} from './util/assets'

import {uuid2short} from './util/shortId'

async function renderApp (ctx) {
  ctx.type = 'text/html'
  ctx.body = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width">
  <base href="/">
  ${cssTag('main')}
  <title>Podqueue</title>
</head>
<body>
  <podq-app>Loading AppComponent content here ...</podq-app>
  ${jsTag('polyfills')}
  ${jsTag('vendor')}
  ${jsTag('main')}
</body>
</html>
  `
}

router.get('/', renderApp)
router.get('/login', renderApp)
router.get('/register', renderApp)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
