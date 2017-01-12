import {Middleware} from 'koa'
import {IRouterContext} from 'koa-router'

export let routePrivateToUser: Middleware = async (ctx: IRouterContext, next) => {
  if (ctx.state.jwt.uuid !== ctx.state.user.uuid) {
    ctx.throw(403)
  }
  await next()
}
