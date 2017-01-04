import * as KoaRouter from 'koa-router'
import {jwtRequiredMiddleware} from '../middleware/jwt'
import loginRoute from './login'

export let apiRouter = new KoaRouter({
  prefix: '/api'
})

loginRoute(apiRouter)
