var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/baseModel')

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  const result = login(username, password)
  result.then(data => {
    if (data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel('成功登录'))
    } else {
      res.json(new ErrorModel('失败登录'))
    }
  })
})

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json(new SuccessModel('成功登录'))
  } else {
    res.json(new ErrorModel('失败登录'))
  }
})

module.exports = router
