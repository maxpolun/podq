import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'

import {QueueComponent} from './queue.component'
import {LoginRequiredGuard} from '../app/login-required.guard'

let routes: Route[] = [
  {
    path: 'queue',
    component: QueueComponent,
    canActivate: [LoginRequiredGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QueueRoutingModule {}
