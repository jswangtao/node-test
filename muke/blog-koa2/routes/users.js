const router = require('koa-router')()

router.prefix('/api/users')

router.post('/login', async function(ctx, next) {
  const { username, password } = ctx.request.body
  ctx.body = {
    erron: 0,
    username,
    password
  }
})

router.get('/session-test', async function(ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount  = 0
  }
  ctx.session.viewCount++
  ctx.body={
    viewCount:ctx.session.viewCount
  }
})

module.exports = router
