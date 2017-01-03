import * as bluebird from 'bluebird';
import {IMain, IDatabase} from 'pg-promise'
interface NoExtensions {}
import {join} from 'path'
import {reloadSql, compressSql} from '../config'

export let pgp: IMain = require('pg-promise')({
  promiseLib: bluebird
})

export type Db = IDatabase<NoExtensions>

export function sqlFile (...paths: string[]) {
  return new pgp.QueryFile(join(paths), {
    debug: reloadSql,
    compress: compressSql
  })
}
