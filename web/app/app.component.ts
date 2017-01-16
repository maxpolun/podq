import { Component } from '@angular/core'
import {LoginService} from '../login/login.service'

@Component({
  selector: 'podq-app',
  template: `
  <podq-app-header *ngIf="loginService.isLoggedIn()"></podq-app-header>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor (private loginService: LoginService) {}
}
