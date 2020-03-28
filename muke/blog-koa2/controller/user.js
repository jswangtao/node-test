const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  // 加密
  password = genPassword(password)
  // 防sql注入
  username = escape(username)
  password = escape(password)

  let sql = `select * from users where username=${username} and password=${password}`
  const result = await exec(sql)
  if (result[0]) {
    return result[0]
  }
  return false
}

module.exports = {
  login
}
