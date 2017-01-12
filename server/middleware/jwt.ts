import {Middleware} from 'koa'
import {signingSecret} from '../../config'
import {verify} from 'jsonwebtoken'
import {promisify} from 'bluebird'

let verifyToken = promisify(verify)

export let jwtRequiredMiddleware: Middleware = async (ctx, next) => {
  try {
    let auth = ctx.headers.authorization
    let tokenString: string = auth.match(/^Bearer (.*)$/i)[1]
    ctx.state.jwt = await verifyToken(tokenString, signingSecret)
    await next()
  } catch (e) {
    ctx.throw(403)
  }
}
