import { Component } from '@angular/core'
import {LoginService} from '../login/login.service'

@Component({
  selector: 'podq-app',
  template: `
  <div *ngIf="loginService.isLoggedIn()">
    <ul>
      <li><a router-link="/queue">queue</a></li>
      <li><a router-link="/subscriptions">subscriptions</a></li>
      <li><a router-link="/podcasts">podcasts</a></li>
    </ul>
  </div>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor (private loginService: LoginService) {}
}
