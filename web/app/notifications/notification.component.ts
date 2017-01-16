import { Component, Input, Output, EventEmitter } from '@angular/core'
import {Notification} from '../../util/notification.service'
import {Observable} from 'rxjs'

@Component({
  selector: 'podq-notification',
  template: `
    <div class="notification">
      <div class="notification-title">{{notification.title}}</div>
      <div class="notification-body">{{notification.text}}</div>
      <button *ngIf="notification.persistent" type="button" class="notification-clear-btn" (click)="clear()">
        &times;
        <span class="sr-only">Clear Notification</span>
      </button>
    </div>
  `
})
export class NotificationComponent {
  @Input()
  private notification: Notification

  @Output()
  private onClear = new EventEmitter<Notification>()

  clear () {
    this.onClear.emit(this.notification)
  }
}
