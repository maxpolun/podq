import {port} from '../config'
import * as Koa from "koa"
if (process.env.OPBEAT_APP_ID) {
  var opbeat = require('opbeat').start()
}

let app = new Koa()

app.use(ctx => {
  ctx.body = 'hello world!'
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
