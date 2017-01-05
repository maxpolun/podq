export let env: string = process.env.NODE_ENV || 'development'

function requiredUnless(varname: string, defaults: {[env: string]: any}) {
  if (process.env[varname]) {
    return process.env[varname]
  }
  if (typeof defaults[env] !== undefined) {
    return defaults[env]
  }
  throw new Error(`${varname} is required in this environment: ${env}`)
}

export let port: number = process.env.PORT || 8000
export let dbUrl: string = requiredUnless('DATABASE_URL', {
  development: 'postgres://podq@localhost/podq-dev',
  test: 'postgres://podq@localhost/podq-test'
})
export let reloadSql = process.env.PODQ_RELOAD_SQL || env === 'development'
export let compressSql = process.env.PODQ_COMPRESS_SQL || env === 'production'
export let signingSecret = requiredUnless('SIGNING_SECRET', {
  development: 'dev-secret',
  test: 'test-secret'
})

export let nodeName = process.env.DYNO || 'local-node'
export let dbConnectTimeout = process.env.PODQ_DB_TIMEOUT || '30s'
