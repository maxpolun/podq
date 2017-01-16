import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'podq-nav-link',
  template: `
    <li class="app-nav-link">
      <a [routerLink]="link" routerLinkActive="active">
        <ng-content></ng-content>
      </a>
    </li>
  `
})
export class NavLinkComponent {
  @Input() link: string
}

@Component({
  selector: 'podq-app-navigation',
  template: `
  <nav class="app-nav">
    <ul class="app-navigation-links">
      <podq-nav-link link="/queue" (click)="navigate('queue')">queue</podq-nav-link>
      <podq-nav-link link="/subscriptions" (click)="navigate('subscriptions')">subscriptions</podq-nav-link>
      <podq-nav-link link="/podcasts" (click)="navigate('podcasts')">podcasts</podq-nav-link>
    </ul>
  </nav>
  `
})
export class NavigationComponent {

  @Output()
  onNavigate: EventEmitter<string> = new EventEmitter()

  navigate(location: string) {
    this.onNavigate.emit(location)
  }
}
