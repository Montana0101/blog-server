/**
 * @description json test
 * @author montana
 */

const server = require('./server')

test('JSON 接口返回数据格式正确', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json',
  })

  expect(res.body.title).toBe('koa2 json')
})
