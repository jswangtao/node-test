const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/baseModel')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录接口
  if (method === 'POST' && req.path === '/api/blog/login') {
    const { username, password } = req.body
    const result = loginCheck(username, password)
    return result.then(data => {
      if (data) {
        return new SuccessModel('成功登录')
      } else {
        return new ErrorModel('失败登录')
      }
    })
  }
}

module.exports = handleUserRouter
