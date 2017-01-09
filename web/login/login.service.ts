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
    try {
      let response = await this.http.post('/api/register', {
        email, password, passwordConfirmation
      }).toPromise()
    } catch (e) {
      let jsonErr = e.json()
      throw jsonErr
    }
    return true
  }

  login (email: string, password: string): Promise<string> {
    return this.http.post('/api/login', {
      email, password
    }).toPromise()
    .then(response => response.json().token)
    .catch(error => error.json())
  }

  private setToken(token: string) {
    window.localStorage.setItem(LSKey, token)
  }
}
