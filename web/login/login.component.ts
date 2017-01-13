import { Component } from '@angular/core'
import {Router} from '@angular/router'

import {LoginForm} from './login.form.model'
import {LoginService} from './login.service'

@Component({
  selector: 'podq-login',
  template: `<h1>Login</h1>
  <form (submit)="trySubmit($event)">
    <div class="form-group">
      <label for="login-email">
        Email
      </label>
      <input
        id="login-email"
        name="email"
        class="form-control"
        required
        [(ngModel)]="form.email"
        />
    </div>

    <div class="form-group">
      <label for="login-email">
        Password
      </label>
      <input
        id="login-password"
        name="password"
        type="password"
        class="form-control"
        required
        [(ngModel)]="form.password"/>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-block">Login</button>
    </div>
    <a routerLink="/register">
      <small>Register for a new account</small>
    </a>
  </form>`
})
export class LoginComponent {
  public form = new LoginForm('', '')
  constructor (private loginService: LoginService, private router: Router) {}

  public async trySubmit(event) {
    event.preventDefault()
    try {
      let result = await this.loginService.login(this.form.email, this.form.password)
      this.router.navigate(['queue'])
      console.log(result)
    } catch (e) {
      console.error(e.json())
    }
  }
}
