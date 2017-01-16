import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms'

import {PodcastsRoutingModule} from './podcasts-routing.module'
import {PodcastsListComponent} from './podcasts-list.component'
import {PodcastsService} from './podcasts.service'

@NgModule({
  imports: [ BrowserModule, FormsModule, PodcastsRoutingModule],
  exports: [],
  declarations: [PodcastsListComponent],
  providers: [PodcastsService]
})
export class PodcastsModule {}
