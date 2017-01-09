import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {HttpModule} from '@angular/http'

import { LoginComponent } from './login.component'
import {RegisterComponent} from './register.component'
import {LoginService} from './login.service'

@NgModule({
  imports: [ BrowserModule, HttpModule ],
  exports: [LoginComponent, RegisterComponent],
  declarations: [ LoginComponent, RegisterComponent ],
  providers: [LoginService]
})
export class LoginModule {}
