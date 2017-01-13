import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms'

import {LoginComponent} from './login.component'
import {RegisterComponent} from './register.component'
import {LoginService} from './login.service'
import {LoginRoutingModule} from './login-routing.module'

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, LoginRoutingModule],
  exports: [LoginComponent, RegisterComponent],
  declarations: [ LoginComponent, RegisterComponent ],
  providers: [LoginService]
})
export class LoginModule {}
