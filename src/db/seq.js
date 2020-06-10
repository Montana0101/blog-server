/**
 * @description sequelize 实例
 * @author montana
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

let conf = {
  host: host,
  dialect: 'mysql',
}

// 单元测试 不打印sequelize语句
if (isTest) {
  conf.logging = () => {}
}

// 线上环境 连接池
if (isProd) {
  conf.pool = {
    max: 5, //最大连接数量
    min: 0,
    idle: 10000, //如果一个连接池10秒内没有被使用,则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
