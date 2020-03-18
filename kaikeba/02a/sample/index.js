const koa = require('koa')
const app = new koa()

// app.use((ctx, next) => {
//   ctx.body = [{ name: 'tom' }]
//   next()
//   // ctx.body.push({
//   //   name: 'guihua'
//   // })
// })

// const router = {}
// router['/html'] = (ctx) => {
//   ctx.type = 'text/html;charset=utf-8'
//   ctx.body = `<b>名字：${ctx.body[0].name}</b>`
// }

// app.use((ctx, next) => {
//   // ctx.body.push({
//   //   name: 'jerry'
//   // })
//   router["/html"](ctx)
// })

app.use(require('koa-static')(__dirname + '/'))

const router = require('koa-router')()
router.get('/string', async (ctx, next) => {
  ctx.body = {
    name: 'string'
  }
})
router.get('/json', async (ctx, next) => {
  ctx.body = {
    name: 'json'
  }
})

app.use(router.routes())

app.listen(3000)
