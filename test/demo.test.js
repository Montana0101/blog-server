/**
 * --runInBand --forceExit --colors  顺序执行 强制退出 配色
 * @description test demo
 * @author montana
 */

function sum(a, b) {
  return a + b
}

test('1+2等于3', () => {
  const res = sum(1, 2)
  expect(res).not.toBe(4)
})
