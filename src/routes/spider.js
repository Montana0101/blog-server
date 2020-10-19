const router = require('koa-router')()
const covidData = require('../json/covid.json')

router.prefix('/api/spider')

router.get('/covid', async (ctx, next) => {
  ctx.body = JSON.stringify(covidData)
})

module.exports = router
