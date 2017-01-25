import {Middleware} from 'koa'
import {IRouterContext} from 'koa-router'

import {db} from '../pg'
import {UserRecord, NoUserError} from '../users/user.model'

export let lookupUserMiddleware: Middleware = async (ctx: IRouterContext, next) => {
  if (ctx.params.userid) {
    try {
      ctx.state.user = await UserRecord.findByShortId(ctx.params.userid, db)
    } catch (e) {
      console.error('can\'t find user with shortid', ctx.params.userid, e)
      if (e instanceof NoUserError) {
        ctx.throw(404)
      }
    }
  }
  await next()
}
