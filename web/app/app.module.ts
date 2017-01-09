import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Route } from '@angular/router'

import { AppComponent } from './app.component'
import {LoginModule} from '../login/login.module'
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
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [ BrowserModule, LoginModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
