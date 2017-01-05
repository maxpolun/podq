import * as KoaRouter from 'koa-router'
import * as body from 'koa-body'
import {db} from '../pg'

import {LoginForm, UserRecord, FormError} from '../users/user.model'

export default (router: KoaRouter) => {
  router.post('login', '/login', body(), async ctx => {
    let errors: FormError[] = []
    try {
      let {email, password} = ctx.request.body
      let user = await UserRecord.findByEmail(email, db)
      let form = new LoginForm(email, password, user)
      let errors = await form.validate()
      if (errors.length) {
        errors = errors.concat(errors)
        throw new Error('login form invalid')
      }
      let token = await user.generateJwt()

      ctx.body = {token}
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
