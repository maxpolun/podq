import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'

import {LoginComponent} from '../login/login.component'
import {RegisterComponent} from '../login/register.component'

let routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
