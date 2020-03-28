const { ErrorModel } = require('../model/baseModel')

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
    return
  }
  ctx.body = new ErrorModel('尚未登录')
}
