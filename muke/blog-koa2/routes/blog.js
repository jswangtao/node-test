const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/baseModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function(ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  if (ctx.query.isadmin) {
    // 管理员界面
    if (!ctx.session.username) {
      ctx.body = new SuccessModel('未登录')
      return
    }
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const result = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(result)
})

router.post('/new',loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  ctx.request.body.author = author
  console.log(ctx.request.body)
  const result = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(result)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.body)
  if (result) {
    ctx.body = new SuccessModel('成功更新')
  } else {
    ctx.body = new ErrorModel('失败更新')
  }
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const result = await delBlog(ctx.query.id, author)
  if (result) {
    ctx.body = new SuccessModel('成功删除')
  } else {
    ctx.body = new ErrorModel('失败删除')
  }
})

module.exports = router
