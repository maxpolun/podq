import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptionsArgs, Response} from '@angular/http'
import {Observable} from 'rxjs'

import {LoginService} from '../login/login.service'

@Injectable()
export class AuthHttp {
  constructor (private http: Http, private loginService: LoginService) {}

  get (route: string, options: RequestOptionsArgs = {}): Observable<Response> {
    return this.http.get(route, this.addAuthHeader(options))
  }

  post (route: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    return this.http.post(route, body, this.addAuthHeader(options))
  }

  put (route: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    return this.http.put(route, body, this.addAuthHeader(options))
  }

  delete (route: string, options: RequestOptionsArgs = {}): Observable<Response> {
    return this.http.delete(route, this.addAuthHeader(options))
  }

  private addAuthHeader(options: RequestOptionsArgs) {
    let headers = options.headers || new Headers()
    headers.append('Authorization', `Bearer ${this.loginService.getToken()}`)
    options.headers = headers
    return options
  }
}
