import { Component } from '@angular/core'
import {Observable} from 'rxjs'

import {SubscriptionsService} from './subscriptions.service'
import {Podcast} from '../podcasts/podcast.model'
import {uuid2short} from '../../server/util/shortId'

@Component({
  selector: 'podq-subscriptions',
  template: `<h3>Subscriptions</h3>
    <ul class="card-deck">
      <li *ngFor="let sub of (subscriptions|async)" class="card">
        <div class="card-header">
          <h6 class="card-title">{{sub.name}}</h6>
          <small>{{sub.feedUrl}}</small>
        </div>
        <p class="card-body">
          {{sub.description}}
        </p>
        <div class="card-footer">
          <a [routerLink]="['podcasts', shortId(sub.uuid), 'episodes']">
            Episodes
          </a>
        </div>
      </li>
    </ul>
  `
})
export class SubscriptionsComponent {
  private subscriptions: Observable<Podcast[]>
  constructor (private subscriptionsService: SubscriptionsService) {}

  ngOnInit () {
    this.subscriptions = this.subscriptionsService.get()
  }

  shortId (uuid: string): string {
    return uuid2short(uuid)
  }
}
