import * as KoaRouter from 'koa-router'
import * as body from 'koa-body'
import {db} from '../pg'
import {subscriptionsRoute, queueRoute} from '../../config/routes'

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
      let subscriptionsUrl = user.uuid ? subscriptionsRoute(user.uuid) : ''
      let queueUrl = user.uuid ? queueRoute(user.uuid) : ''
      ctx.body = {token, subscriptionsUrl, queueUrl}
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
