import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'

import {SubscriptionsComponent} from './subscriptions.component'
import {LoginRequiredGuard} from '../app/login-required.guard'

let routes: Route[] = [
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [LoginRequiredGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule {}
