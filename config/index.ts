export let env: string = process.env.NODE_ENV || 'development'
export let port: number = process.env.PORT || 8000
export let dbUrl: string = process.env.DATABASE_URL ||
  (() => {
    switch (env) {
      case 'development': return 'postgres://podq@localhost/podq-dev';
      case 'test': return 'postgres://podq@localhost/podq-test';
      default: throw new Error('DATABASE_URL is required to be specified for this environment')
    }
  })()
export let reloadSql = process.env.PODQ_RELOAD_SQL || env === 'development'
export let compressSql = process.env.PODQ_RELOAD_SQL || env === 'production'
