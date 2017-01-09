import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

const LSKey = 'podqLoginToken'

@Injectable()
export class LoginService {
  constructor (private http: Http) {}

  isLoggedIn (): Boolean {
    return !!window.localStorage.getItem(LSKey)
  }

  async register (email: string, password: string, passwordConfirmation: string): Promise<Boolean> {
    let response = await this.http.post('/api/register', {
      email, password, passwordConfirmation
    }).toPromise()
    if (!response.ok) {
      throw response.json()
    }
    return true
  }

  async login (email: string, password: string): Promise<string> {
    let response = await this.http.post('/api/login', {
      email, password
    }).toPromise()
    if (!response.ok) {
      throw response.json()
    }
    let token = response.json().token
    this.setToken(token)
    return token
  }

  private setToken(token: string) {
    window.localStorage.setItem(LSKey, token)
  }
}
