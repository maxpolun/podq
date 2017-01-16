import {Injectable} from '@angular/core'
import {Http, Headers} from '@angular/http'
import {Observable} from 'rxjs'

import {Podcast} from '../podcasts/podcast.model'
import {LoginService} from '../login/login.service'

import {podcastsSearchRoute} from '../../config/routes'

@Injectable()
export class PodcastsService {
  constructor (private http: Http, private loginService: LoginService) {}

  get (): Observable<Podcast[]> {
    return this.http.get(podcastsSearchRoute, {
      headers: new Headers({
        Authorization: `Bearer ${this.loginService.getToken()}`
      })
    }).map(response => response.json())
  }
}
