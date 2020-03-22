var express = require('express')
var router = express.Router()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/baseModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (req.query.isadmin) {
    // 管理员界面
    if (!req.session.username) {
      res.json(new SuccessModel('未登录'))
      return
    }
  }

  const result = getList(author, keyword)
  result.then(listData => {
    res.json(new SuccessModel(listData))
  })
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  const author = req.session.username
  req.body.author = author
  const result = newBlog(req.body)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  result.then(data => {
    if (data) {
      res.json(new SuccessModel('成功更新'))
    } else {
      res.json(new ErrorModel('失败更新'))
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  result.then(data => {
    if (data) {
      res.json(new SuccessModel('成功删除'))
    } else {
      res.json(new ErrorModel('失败删除'))
    }
  })
})

module.exports = router
