import {Db, sqlFile} from '../pg'

let findAllSubscriptionsByUserUuid = sqlFile(__dirname, 'findAllSubscriptionsByUserUuid.sql')
let createSubscription = sqlFile(__dirname, 'createSubscription.sql')

export class SubscriptionsRecord {
  constructor (private uuid: string,
               private feedUrl: string,
               private name: string,
               private description: string,
               private userUuid: string) {}

  static async findAllByUserUuid (uuid: string, db: Db): Promise<SubscriptionsRecord[]> {
    let result = await db.manyOrNone(findAllSubscriptionsByUserUuid, {uuid})
    return result.map(item => new SubscriptionsRecord(item.uuid,
                                                      item.feed_url,
                                                      item.name,
                                                      item.description,
                                                      item.user_uuid))
  }
  static async create (podcastUuid: string, userUuid: string, db: Db) {
    await db.none(createSubscription, {podcastUuid, userUuid})
  }
}
