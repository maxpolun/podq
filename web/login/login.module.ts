import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms'
import {RouterModule} from '@angular/router'

import { LoginComponent } from './login.component'
import {RegisterComponent} from './register.component'
import {LoginService} from './login.service'

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, RouterModule ],
  exports: [LoginComponent, RegisterComponent],
  declarations: [ LoginComponent, RegisterComponent ],
  providers: [LoginService]
})
export class LoginModule {}
