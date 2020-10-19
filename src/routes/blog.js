const router = require('koa-router')()
const {
  appendBlog,
  getBlogs,
  getDetail,
  updateBlog,
  deleteBlog,
  appendLearningRecord,
} = require('../controller/blog')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const { pageNo, pageSize, classify, typeNo } = ctx.request.query
  ctx.body = await getBlogs(pageNo, pageSize, classify, typeNo)
})

router.get('/detail', async (ctx, next) => {
  const { id } = ctx.request.query
  ctx.body = await getDetail(id)
})

router.post('/append', async (ctx, next) => {
  //   const {title,content,author,imgUrl,classify,status} = ctx.request.body
  ctx.body = await appendBlog(ctx.request.body)
})

router.post('/update', async (ctx, next) => {
  const { id } = ctx.request.query
  ctx.body = await updateBlog(id, ctx.request.body)
})

router.post('/delete', async (ctx, next) => {
  const { id, userId } = ctx.request.body
  ctx.body = await deleteBlog(id, userId)
})

router.post('/learn', async (ctx, next) => {
  ctx.body = await appendLearningRecord(ctx.request.body)
})

module.exports = router
