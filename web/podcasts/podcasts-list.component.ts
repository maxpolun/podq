import { Component } from '@angular/core'
import {Observable} from 'rxjs'

import {PodcastsService} from './podcasts.service'
import {Podcast} from './podcast.model'

@Component({
  selector: 'podq-podcasts-list',
  template: `
  <h3>Podcasts</h3>
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
  constructor (private podcastsService: PodcastsService) {}

  ngOnInit () {
    this.podcasts = this.podcastsService.get()
  }

  subscribe (podcast: Podcast) {
    console.log('subscribed', podcast)
    podcast.subscribed = true
  }

  unsubscribe (podcast: Podcast) {
    console.log('unsubscribed', podcast)
    podcast.subscribed = false
  }
}
