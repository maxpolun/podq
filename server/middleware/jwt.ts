import {Middleware} from 'koa'
import {signingSecret} from '../../config'
import {verify} from 'jsonwebtoken'
import {promisify} from 'bluebird'

let verifyToken = promisify(verify)

export let jwtRequiredMiddleware: Middleware = async (ctx, next) => {
  let auth = ctx.headers.authorization
  if (!auth) {
    ctx.throw(403)
  }
  let tokenString: string = auth.match(/^Bearer (.*)$/)[1]
  ctx.state.jwt = await verifyToken(tokenString, signingSecret)
  await next()
}
