import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {AuthHttp} from '../util/AuthHttp.service'
import {LoginService} from '../login/login.service'
import {Podcast} from '../podcasts/podcast.model'

@Injectable()
export class SubscriptionsService {
  constructor (private http: AuthHttp, private loginService: LoginService) {}

  get (): Observable<Podcast[]> {
    return this.http.get(this.loginService.getSubscriptionsUrl()).map(response => response.json())
  }

  subscribe (podcast: Podcast) {
    return this.http.post(this.loginService.getSubscriptionsUrl(), {podcastUuid: podcast.uuid}).map(response => response.json)
  }
}
