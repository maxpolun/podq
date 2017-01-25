import * as KoaRouter from 'koa-router'
import {routePrivateToUser} from '../middleware/privateToUser'
import {lookupUserMiddleware} from '../middleware/lookupUser'
import {db} from '../pg'
import {UserRecord} from '../users/user.model'
import {SubscriptionsRecord} from '../podcasts/subscription.model'
import * as KoaBody from 'koa-body'

export default (router: KoaRouter) => {
  router.get('user-subscriptions', '/users/:userid/subscriptions',
             lookupUserMiddleware, routePrivateToUser, async ctx => {
    let user: UserRecord = ctx.state.user
    ctx.body = await user.subscriptions(db)
  })

  router.post('user-subscribe', '/users/:userid/subscriptions',
              lookupUserMiddleware,
              routePrivateToUser,
              KoaBody(),
              async ctx => {
    let user: UserRecord = ctx.state.user
    let {podcastUuid} = ctx.request.body
    if (!user.uuid) {
      throw new Error('trying to save a subscription for a user that doesn\'t exist')
    }
    await SubscriptionsRecord.create(podcastUuid, user.uuid, db)
    ctx.body = {}
  })
}
