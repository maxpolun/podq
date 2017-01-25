import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

const TOKEN_KEY = 'podqLoginToken'
const SUBS_KEY = 'podqSubscriptionsUrl'
const QUEUE_KEY = 'podqQueueUrl'

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
    .then(response => response.json())
    .then(json => {
      this.setToken(json.token)
      this.setSubscriptionsUrl(json.subscriptionsUrl)
      this.setQueueUrl(json.queueUrl)
      return json.token
    })
    .catch(error => error.json())
  }

  isLoggedIn (): boolean {
    return !!this.getToken()
  }

  getToken(): string|null {
    return this.getKey(TOKEN_KEY)
  }

  getSubscriptionsUrl (): string {
    return this.getKey(SUBS_KEY)
  }

  getQueueUrl (): string {
    return this.getKey(QUEUE_KEY)
  }

  private setSubscriptionsUrl (url) {
    this.setKey(SUBS_KEY, url)
  }

  private setQueueUrl (url) {
    this.setKey(QUEUE_KEY, url)
  }

  private setToken(token: string) {
    this.setKey(TOKEN_KEY, token)
  }

  private setKey(key, val) {
    window.localStorage.setItem(key, val)
  }

  private getKey(key): any {
    return window.localStorage.getItem(key)
  }
}
