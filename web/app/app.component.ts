import { Component } from '@angular/core'

@Component({
  selector: 'podq-app',
  template: `<h1>Hello {{name}}</h1>
  <podq-login>`
})
export class AppComponent { name = 'Podq' }
