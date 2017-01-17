import {Injectable} from '@angular/core'
import {AuthHttp} from '../util/AuthHttp.service'
import {Observable} from 'rxjs'

import {Podcast} from './podcast.model'
import {LoginService} from '../login/login.service'

@Injectable()
export class PodcastsService {
  constructor (private http: AuthHttp, private loginService: LoginService) {}

  get (): Observable<Podcast[]> {
    return this.http.get('/podcasts').map(response => response.json())
  }

  add (url: string): Observable<any> {
    return this.http.post('/podcasts', {url}).map(r => r.json(), r => r.json())
  }
}
