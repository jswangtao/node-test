const Koa = require('../like-koa2/index')
const app = new Koa()

// logger

app.use(async (ctx, next) => {
  console.log("第一层洋葱，start");
  await next()
  console.log("第一层洋葱，end");

})

// x-response-time

app.use(async (ctx, next) => {
  console.log("第二层洋葱，start");
  await next()
  console.log("第二层洋葱，end");

})

// response

app.use(async ctx => {
  ctx.res.end('Hello World')
})

app.listen(3000)
