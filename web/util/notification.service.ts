import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'

export interface Notification {
  id: number,
  title: string,
  text: string,
  persistent: boolean,
}

@Injectable()
export class NotificationService {
  notifications: Notification[] = []
  counter = 0
  subject = new Subject<Notification[]>()

  listen (): Observable<Notification[]> {
    setTimeout(() => this.update(), 100)
    return this.subject
  }

  notify (title: string, text: string, timeout?: number|undefined) {
    if (typeof timeout === 'undefined') {
      this.addNotification(title, text, true)
    } else {
      let n = this.addNotification(title, text, false)
      Observable.timer(timeout).subscribe(() => {
        this.removeNotification(n)
        this.update()
      })
    }
    this.update()
  }

  clearNotification (n: Notification) {
    this.removeNotification(n)
    this.update()
  }

  clearAll () {
    this.notifications = []
    this.update()
  }

  private update() {
    this.subject.next(this.notifications)
  }

  private addNotification(title, text, persistent): Notification {
    let n = {id: this.counter++, title, text, persistent}
    this.notifications.push(n)
    return n
  }

  private removeNotification (n: Notification) {
    let index = this.notifications.indexOf(n)
    this.notifications.splice(index, 1)
  }
}
