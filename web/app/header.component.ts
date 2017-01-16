import { Component } from '@angular/core'

@Component({
  selector: 'podq-app-header',
  template: `
  <header>
    <button type="button" class="btn-hamburger" (click)="toggleMenu($event)">
      <span class="hamburger-icon"></span>
      <span class="sr-only">Open Menu</span>
    </button>
    <h1>Podq</h1>
    <podq-app-navigation [class.nav-hidden]="menuHidden" (onNavigate)="hideMenu()"></podq-app-navigation>
  </header>
  `
})
export class HeaderComponent {
  menuHidden: boolean = true

  toggleMenu (event) {
    event.preventDefault()
    this.menuHidden = !this.menuHidden
  }

  hideMenu () {
    this.menuHidden = true
  }
}
