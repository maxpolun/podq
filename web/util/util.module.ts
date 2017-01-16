import { NgModule } from '@angular/core'

import {AuthHttp} from './AuthHttp.service'
import {NotificationService} from './notification.service'

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [AuthHttp, NotificationService]
})
export class UtilModule {}
