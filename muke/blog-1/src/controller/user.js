const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  // 加密
  password = genPassword(password)
  // 防sql注入
  username = escape(username)
  password = escape(password)

  let sql = `select * from users where username=${username} and password=${password}`
  console.log(sql)
  return exec(sql).then(result => {
    if (result[0]) {
      return result[0]
    }
    return false
  })
}

module.exports = {
  login
}
