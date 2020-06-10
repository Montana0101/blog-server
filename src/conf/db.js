/**
 * @description 存储配置
 * @author montana
 */
const { isProd } = require('../utils/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '141592',
  port: '3306',
  database: 'koa2',
  host: 'localhost',
}

if (isProd) {
  REDIS_CONF = {
    // 线上 REDIS
    port: 6379,
    host: '127.0.0.1',
  }

  MYSQL_CONF = {
    // 线上 MYSQL
    host: 'localhost',
    user: 'root',
    password: '141592',
    port: '3306',
    database: 'koa2',
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
}
