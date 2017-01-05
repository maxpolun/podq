import * as KoaRouter from 'koa-router'
import * as body from 'koa-body'
import {resolve} from 'url'
import {db} from '../pg'
import {send} from '../util/email'
import {baseUrl} from '../../config'

import {RegisterUserForm, RegisterTokenRecord, FormError, UserRecord} from '../users/user.model'

export default (router: KoaRouter) => {
  router.post('register', '/register', body(), async ctx => {
    let {email, password, passwordConfirmation} = ctx.request.body
    let form = new RegisterUserForm(email, password, passwordConfirmation)
    let errors = form.validate()
    if (errors.length) {
      ctx.status = 400
      ctx.body = {
        message: 'unable to register',
        errors
      }
      return
    }
    let record = await form.toRecord()
    await record.save(db)
    let url = resolve(baseUrl, `/api/register?token=${record.shortId()}`)
    await send(email,
               'Confirm Email to register for podqueue',
               `You have attempted to register for podqueue. Go to ${url} to confirm your email address`)

    ctx.status = 201
    ctx.body = {
      message: 'email sent'
    }
  })

  router.get('confirmRegister', '/register', async ctx => {
    let record = await RegisterTokenRecord.findByShortId(ctx.query.token, db)
    let user = record.toUser()
    await user.save(db)

    ctx.status = 200
    ctx.body = {
      confirmed: true
    }
  })
}
