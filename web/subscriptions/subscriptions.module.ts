import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import {SubscriptionsRoutingModule} from './subscriptions-routing.module'
import {SubscriptionsComponent} from './subscriptions.component'
import {SubscriptionsService} from './subscriptions.service'

@NgModule({
  imports: [ BrowserModule, FormsModule, SubscriptionsRoutingModule],
  exports: [],
  declarations: [SubscriptionsComponent],
  providers: [SubscriptionsService]
})
export class SubscriptionsModule {}
