import * as KoaRouter from 'koa-router'
import {jwtRequiredMiddleware} from '../middleware/jwt'
import loginRoute from './login'
import registerRoute from './register'

export let apiRouter = new KoaRouter({
  prefix: '/api'
})

loginRoute(apiRouter)
registerRoute(apiRouter)

let authRequiredRouter = new KoaRouter()
authRequiredRouter.use(jwtRequiredMiddleware)

import subscriptionsRoutes from './subscriptions'
subscriptionsRoutes(authRequiredRouter)
import podcastsRoute from './podcasts'
podcastsRoute(authRequiredRouter)
apiRouter.use(authRequiredRouter.routes(), authRequiredRouter.allowedMethods())
