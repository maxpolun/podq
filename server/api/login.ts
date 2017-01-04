import * as KoaRouter from 'koa-router'
import * as body from 'koa-body'
import {db} from '../pg'

import {LoginForm, UserRecord, LoginFormError} from '../users/user.model'
class LoginFormInvalidError extends Error {}

export default (router: KoaRouter) => {
  router.post('login', '/login', body(), async ctx => {
    let errors: LoginFormError[] = []
    try {
      let {email, password} = ctx.request.body
      let user = await UserRecord.findByEmail(email, db)
      let form = new LoginForm(email, password, user)
      let errors = await form.validate()
      if (errors.length) {
        errors = errors.concat(errors)
        throw new Error('login form invalid')
      }
      this.body = {token: await user.generateJwt()}
    } catch (e) {
      if (e.errId) {
        errors.push(e)
      }
      if (errors.length) {
        ctx.status = 400
        ctx.body = {
          message: 'unable to login',
          errors
        }
      } else {
        throw e
      }
    }
  })
}
