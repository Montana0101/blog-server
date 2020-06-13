/**
 * @description User 路由
 * @author montana
 */
const router = require('koa-router')()
const {
  isExist,
  userRegister,
  userLogin,
  getAdminInfo,
  getAdminInfoTotal,
} = require('../controller/user')

router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
  const { userName, password, nickName } = ctx.request.body
  ctx.body = await userRegister(userName, password, nickName)
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await userLogin(userName, password)
})

// 获取管理员信息
router.get('/admin', async (ctx, next) => {
  const { author, pageNo, pageSize } = ctx.request.query
  ctx.body = await getAdminInfo(author, pageNo, pageSize)
})

// 获取管理员列表总数
router.get('/admin/total', async (ctx, next) => {
  const { author } = ctx.request.query
  ctx.body = await getAdminInfoTotal(author)
})
module.exports = router
