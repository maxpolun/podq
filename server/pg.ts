import * as bluebird from 'bluebird'
import {IMain, IDatabase} from 'pg-promise'
import {join} from 'path'
import {dbUrl, reloadSql, compressSql, nodeName, dbConnectTimeout} from '../config'

export let pgp: IMain = require('pg-promise')({
  promiseLib: bluebird,
  native: false,
  connect: (client, dc, fresh) => {
    if (fresh) {
      client.query(`SET application_name TO '${nodeName}';
                    SET statement_timeout TO '${dbConnectTimeout}';`)
    }
  }
})

interface NoExtensions {}
export type Db = IDatabase<NoExtensions>

export function sqlFile (...paths: string[]) {
  let path = join(...paths)
  return new pgp.QueryFile(path, {
    debug: reloadSql,
    compress: compressSql
  })
}

console.log('connecting to ', dbUrl)
export let db = pgp(dbUrl)
