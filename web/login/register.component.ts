import { Component } from '@angular/core'

import {LoginService} from './login.service'
import {RegisterForm} from './register.form.model'

@Component({
  selector: 'podq-register',
  template: `<h1>Register</h1>
  <p *ngIf="emailSent">
    An email has been sent to {{form.email}}.
  </p>
  <form (submit)="trySubmit($event)" *ngIf="!emailSent">
    <div class="error" *ngIf="errors && errors.length">
      {{errors | json}}
    </div>
    <div class="form-group">
      <label for="register-email">
        Email
      </label>
      <input
        id="register-email"
        name="email"
        class="form-control"
        required
        [(ngModel)]="form.email"
        />
    </div>

    <div class="form-group">
      <label for="register-password">
        Password
      </label>
      <input
        id="register-password"
        name="password"
        type="password"
        class="form-control"
        required
        [(ngModel)]="form.password"/>
    </div>

    <div class="form-group">
      <label for="register-password-confirmation">
        Password Confirmation
      </label>
      <input
        id="register-password-confirmation"
        name="password-confirmation"
        type="password"
        class="form-control"
        required
        [(ngModel)]="form.passwordConfirmation"/>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-block">Register</button>
    </div>
    <a routerLink="/login">
      <small>Login to an existing account</small>
    </a>
  </form>`
})
export class RegisterComponent {
  public form = new RegisterForm('', '', '')
  public emailSent = false
  public errors: string[] = []
  constructor (private loginService: LoginService) {}

  trySubmit (event) {
    this.loginService.register(this.form.email, this.form.password, this.form.passwordConfirmation)
        .then(sent => { this.emailSent = sent })
        .catch(err => { this.errors = err.errors })
  }
}
