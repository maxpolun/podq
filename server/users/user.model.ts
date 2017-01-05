import {pgp, Db, sqlFile} from '../pg'
import {compare, hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {signingSecret} from '../../config'

let saveUser = sqlFile(__dirname, 'save.sql')
let findUserByEmail = sqlFile(__dirname, 'find.sql')

export class UserRecord {
  constructor (public email: string,
               public pwHash: string,
               public uuid: string | undefined = undefined) {}

  static async findByEmail (email: string, db: Db): Promise<UserRecord> {
    let record = await db.oneOrNone(findUserByEmail, {email})

    if (!record) {
      throw {
        errId: 'login.badlogin'
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

function validateNotBlank(form: string, field: string, val: any, errors: FormError[]) {
  if (val[field].trim() === '') {
    errors.push({
      errId: [form, field, 'blank'].join('.')
    })
  }
}

export class LoginForm {
  constructor (private email: string, private password: string, private user: UserRecord) {}

  async validate (): Promise<FormError[]> {
    let errors: FormError[] = []

    validateNotBlank('login', 'email', this, errors)
    validateNotBlank('login', 'password', this, errors)

    if (!await compare(this.password, this.user.pwHash)) {
      errors.push({
        errId: 'login.badlogin'
      })
    }
    return errors
  }
}

export class RegisterUserForm {
  constructor (private email: string, private password: string, private passwordConfirmation) {}

  validate (): FormError[] {
    let errors: FormError[] = []

    validateNotBlank('register', 'email', this, errors)

    if (!this.email.includes('@')) {
      errors.push({
        errId: 'register.email.invalid'
      })
    }

    validateNotBlank('register', 'password', this, errors)
    validateNotBlank('register', 'passwordConfirmation', this, errors)

    if (this.password !== this.passwordConfirmation) {
      errors.push({
        errId: 'register.passwordConfirmation.noMatch'
      })
    }

    return errors
  }

  async toRecord (): Promise<RegisterTokenRecord> {
    let pwHash = await hash(this.password, 10)
    return new RegisterTokenRecord(
      undefined,
      this.email,
      pwHash
    )
  }
}

import {uuid2short, short2uuid} from '../util/shortId'
let saveRegisterToken = sqlFile(__dirname, 'saveRegisterToken.sql')
let findRegisterToken = sqlFile(__dirname, 'findRegisterToken.sql')

export class RegisterTokenRecord {
  constructor (private uuid: string|undefined,
               private email: string,
               private pwHash: string,
               private createdAt: Date|undefined = undefined) {}

  static async findByShortId(shortId: string, db): Promise<RegisterTokenRecord> {
    let uuid: string = short2uuid(shortId)
    let result = await db.one(findRegisterToken, {uuid})
    return new RegisterTokenRecord(result.uuid, result.email, result.pw_hash, result.created_at)
  }

  async save (db: Db) {
    let result = await db.one(saveRegisterToken, this)
    this.uuid = result.uuid
    this.createdAt = result.created_at
  }

  shortId (): string {
    if (!this.uuid) {
      throw new Error('tried to get the shortId of an unsaved register token')
    }
    return uuid2short(this.uuid)
  }

  toUser (): UserRecord {
    return new UserRecord(this.email, this.pwHash)
  }
}

export interface FormError {
  errId: string
}
