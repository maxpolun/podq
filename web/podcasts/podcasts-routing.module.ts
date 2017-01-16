import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'

import {PodcastsListComponent} from './podcasts-list.component'
import {AddPodcastComponent} from './add-podcast.component'
import {LoginRequiredGuard} from '../app/login-required.guard'

let routes: Route[] = [
  {
    path: 'podcasts',
    component: PodcastsListComponent,
    canActivate: [LoginRequiredGuard]
  },
  {
    path: 'podcasts/add',
    component: AddPodcastComponent,
    canActivate: [LoginRequiredGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PodcastsRoutingModule {}
