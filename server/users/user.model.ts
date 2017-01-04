import {pgp, Db, sqlFile} from '../pg'
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {signingSecret} from '../../config'

let saveUser = sqlFile(__dirname, 'save.sql')
let findUserByEmail = sqlFile(__dirname, 'find.sql')

export class UserRecord {
  constructor (public email: string,
               public pwHash: string,
               public uuid: string | null) {}

  static async findByEmail (email: string, db: Db): Promise<UserRecord> {
    let record = await db.oneOrNone(findUserByEmail, {email})

    if (!record) {
      throw {
        errId: 'login.badlogin',
        message: 'Email and password do not match.'
      }
    }
    return new UserRecord(record.email, record.pw_hash, record.uuid)
  }

  async save (db: Db) {
    let result = await db.one(saveUser, this)
    if (!this.uuid) {
      this.uuid = result.uuid
    }
  }

  generateJwt (): Promise<string> {
    return new Promise ((resolve, reject) => {
      sign(
        {
          uuid: this.uuid,
          email: this.email
        },
        signingSecret,
        {
          expiresIn: '7d'
        },
        (err, token) => {
          if (err) {
            return reject(err)
          }
          resolve(token)
        }
      )
    })
  }
}

export class RegisterUserForm {

}

export interface LoginFormError {
  errId: string,
  message: string
}

export class LoginForm {
  constructor (private email: string, private password: string, private user: UserRecord) {}

  async validate (): Promise<LoginFormError[]> {
    let errors: LoginFormError[] = []
    if (this.email.trim() === '') {
      errors.push({
        errId: 'login.email.blank',
        message: 'Email cannot be blank!'
      })
    }

    if (this.password.trim() === '') {
      errors.push({
        errId: 'login.password.blank',
        message: 'Password cannot be blank!'
      })
    }

    if (!await compare(this.password, this.user.pwHash)) {
      errors.push({
        errId: 'login.badlogin',
        message: 'Email and password do not match.'
      })
    }
    return errors
  }
}
