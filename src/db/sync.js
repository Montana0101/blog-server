/**
 * @description 同步数据库
 * @author montana
 */

const seq = require('./seq')
require('./model')

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok')
  })
  .catch(() => {
    console.log('auth err')
  })

// 同步
seq.sync({ force: false }).then(() => {
  console.log('sync ok')
  process.exit()
})
