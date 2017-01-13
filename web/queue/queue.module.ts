import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import {QueueRoutingModule} from './queue-routing.module'
import {QueueComponent} from './queue.component'

@NgModule({
  imports: [ BrowserModule, FormsModule, QueueRoutingModule],
  exports: [],
  declarations: [QueueComponent],
  providers: []
})
export class QueueModule {}
