import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Route } from '@angular/router'

import {AppComponent} from './app.component'
import {NavigationComponent, NavLinkComponent} from './navigation.component'
import {HeaderComponent} from './header.component'
import {NotificationListComponent} from './notifications/notification-list.component'
import {NotificationComponent} from './notifications/notification.component'

import {LoginModule} from '../login/login.module'
import {QueueModule} from '../queue/queue.module'
import {UtilModule} from '../util/util.module'
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
    SubscriptionsModule,
    UtilModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    NavLinkComponent,
    NotificationListComponent,
    NotificationComponent ],
  providers: [LoginRequiredGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
