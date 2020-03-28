const router = require('koa-router')()

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/baseModel')

router.prefix('/api/user')

router.post('/login', async function(ctx, next) {
  const { username, password } = ctx.request.body
  const result = await login(username, password)
  if (result.username) {
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    ctx.body = new SuccessModel('成功登录')
  } else {
    ctx.body = new ErrorModel('失败登录')
  }
})



module.exports = router
