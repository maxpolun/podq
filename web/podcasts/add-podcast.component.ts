import { Component } from '@angular/core'
import {Observable} from 'rxjs'

import {PodcastsService} from './podcasts.service'
import {NotificationService} from '../util/notification.service'
import {Podcast} from './podcast.model'

@Component({
  selector: 'podq-podcasts-list',
  template: `
  <h3>Podcasts <a routerLink="/podcasts" class="btn">List</a></h3>
  <form (submit)="submit($event)">
    <div class="form-group">
      <label for="add-podcast-url">
        Feed Url
      </label>
      <input
        id="add-podcast-url"
        name="url"
        class="form-control"
        required
        [(ngModel)]="form.url"
        />
    </div>
    <button type="submit" class="btn">
      Add
    </button>
  </form>
  `
})
export class AddPodcastComponent {
  private form = {url: ''}
  private errors: any[] = []
  constructor (private podcastsService: PodcastsService, private notificationService: NotificationService) {}

  submit (event) {
    event.preventDefault()
    this.podcastsService.add(this.form.url)
        .subscribe(res => {
          this.notificationService.notify('Podcast added', res.podcast.title, 5000)
          this.form.url = ''
        })
  }
}
