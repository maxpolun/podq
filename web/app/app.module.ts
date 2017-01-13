import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Route } from '@angular/router'

import { AppComponent } from './app.component'
import {LoginModule} from '../login/login.module'
import {QueueModule} from '../queue/queue.module'
import {SubscriptionsModule} from '../subscriptions/subscriptions.module'
import {PodcastsModule} from '../podcasts/podcasts.module'
import {LoginRequiredGuard} from './login-required.guard'

let routes: Route[] = [
  {
    path: '',
    canActivate: [LoginRequiredGuard],
    redirectTo: '/queue',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    LoginModule,
    PodcastsModule,
    QueueModule,
    SubscriptionsModule
  ],
  declarations: [ AppComponent ],
  providers: [LoginRequiredGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
