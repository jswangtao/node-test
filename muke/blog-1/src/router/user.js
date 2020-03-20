const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/baseModel')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录接口
  if (method === 'GET' && req.path === '/api/blog/login') {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccessModel('成功登录')
      } else {
        return new ErrorModel('失败登录')
      }
    })
  }

  // 登录接口
  if (method === 'GET' && req.path === '/api/blog/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({ session: req.session }))
    }
    return  Promise.resolve(new ErrorModel('失败登录'))
  }
}

module.exports = handleUserRouter
