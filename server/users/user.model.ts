import {IDatabase} from 'pg-promise'
import {join} from 'path'
interface IEmptyExt {}
import {pgp} from '../pg'

let saveUser = new pgp.QueryFile(join(__dirname, 'save.sql'))

export class UserRecord {
  constructor (public email: string,
                public pwHash: string,
                public uuid: string | null) {}

  async save (db: IDatabase<IEmptyExt>) {
    let result = await db.one(saveUser, this)
    if (!this.uuid) {
      this.uuid = result.uuid
    }
  }
}

export class registerUserForm {

}

export class loginForm {

}
