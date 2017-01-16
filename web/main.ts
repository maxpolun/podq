require('./common.scss')

import {AppModule} from './app/app.module'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import {enableProdMode} from '@angular/core'

let useProdMode = process.env.PODQ_ANGULAR_PROD_MODE
if (typeof useProdMode === 'undefined') {
  useProdMode = process.env.NODE_ENV === 'production' ? 'true' : 'false'
}

if (useProdMode !== 'false') {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
