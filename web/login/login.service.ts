import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

const LSKey = 'podqLoginToken'

@Injectable()
export class LoginService {
  constructor (private http: Http) {}

  register (email: string, password: string, passwordConfirmation: string): Promise<boolean> {
    return this.http.post('/api/register', {
      email, password, passwordConfirmation
    }).toPromise()
      .then(() => true)
      .catch(e => Promise.reject(e.json()))
  }

  login (email: string, password: string): Promise<string> {
    return this.http.post('/api/login', {
      email, password
    }).toPromise()
    .then(response => response.json().token)
    .then(token => {
      this.setToken(token)
      return token
    })
    .catch(error => error.json())
  }

  isLoggedIn (): boolean {
    return !!this.getToken()
  }

  getToken(): string|null {
    return window.localStorage.getItem(LSKey)
  }

  private setToken(token: string) {
    window.localStorage.setItem(LSKey, token)
  }
}
