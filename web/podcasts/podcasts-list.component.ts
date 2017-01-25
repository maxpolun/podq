import { Component } from '@angular/core'
import {Observable} from 'rxjs'

import {PodcastsService} from './podcasts.service'
import {Podcast} from './podcast.model'
import {SubscriptionsService} from '../subscriptions/subscriptions.service'

@Component({
  selector: 'podq-podcasts-list',
  template: `
  <h3>Podcasts <a routerLink="/podcasts/add" class="btn">Add</a></h3>
  <ul class="card-deck">
    <li class="card" *ngFor="let podcast of (podcasts | async)">
      <div class="card-header">
        <h6 class="card-title">{{podcast.name}}</h6>
        <small>{{podcast.feedUrl}}</small>
      </div>
      <p class="card-body">
        {{podcast.description}}
      </p>
      <div class="card-footer">
        <button type="button" class="btn" *ngIf="!podcast.subscribed" (click)="subscribe(podcast)">
          Subscribe
        </button>
        <button type="button" class="btn" *ngIf="podcast.subscribed" (click)="unsubscribe(podcast)">
          Unsubscribe
        </button>
      </div>
    </li>
  </ul>
  `
})
export class PodcastsListComponent {
  private podcasts: Observable<Podcast[]>
  constructor (private podcastsService: PodcastsService,
               private subscriptionsService: SubscriptionsService) {}

  ngOnInit () {
    this.podcasts = this.podcastsService.get()
  }

  subscribe (podcast: Podcast) {
    this.subscriptionsService.subscribe(podcast).subscribe(() => podcast.subscribed = true)
  }

  unsubscribe (podcast: Podcast) {
    throw new Error('not implemented')
  }
}
