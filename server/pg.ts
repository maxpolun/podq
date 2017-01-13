import * as bluebird from 'bluebird'
import {IMain, IDatabase} from 'pg-promise'
import * as pgPromise from 'pg-promise'
import {join} from 'path'
import {dbUrl, reloadSql, compressSql, nodeName, dbConnectTimeout, logSql} from '../config'

let options = {
  promiseLib: bluebird,
  pgNative: false
}

export let pgp: IMain = pgPromise(options)
if (logSql) {
  require('pg-monitor').attach(options)
}

interface NoExtensions {}
export type Db = IDatabase<NoExtensions>

export function sqlFile (...paths: string[]) {
  let path = join(...paths)
  return new pgp.QueryFile(path, {
    debug: reloadSql,
    compress: compressSql
  })
}

export let db = pgp(dbUrl)
