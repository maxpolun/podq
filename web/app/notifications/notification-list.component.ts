import { Component } from '@angular/core'
import {NotificationService, Notification} from '../../util/notification.service'
import {Observable} from 'rxjs'

@Component({
  selector: 'podq-notification-list',
  template: `
    <podq-notification *ngFor="let notification of (notifications | async)"
      [notification]="notification"
      (onClear)="clear($event)"></podq-notification>
  `
})
export class NotificationListComponent {
  private notifications: Observable<Notification[]>
  constructor (private notificationService: NotificationService) {}

  ngOnInit () {
    this.notifications = this.notificationService.listen()
  }

  clear (notification: Notification) {
    this.notificationService.clearNotification(notification)
  }
}
