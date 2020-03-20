const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
  let sql = `select username , password from users where username='${username}' and password='${password}'`
  return exec(sql).then(result => {
    if (result[0]) {
      return true
    }
    return false
  })
}

module.exports = {
  loginCheck
}
