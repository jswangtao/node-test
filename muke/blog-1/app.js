const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')

let SESSION_DATA = {}

// 解析postData
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      // console.log(postData,222);
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('content-type', 'application/json')

  // 添加path
  const url = req.url
  const path = url.split('?')[0]
  req.path = path

  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析session
  let needSetCookie = false
  let sessionId = req.cookie.sessionId
  req.sessionId = sessionId
  // let result = get(sessionId)
  // result.then(data => {
  //   console.log(data)
  // })
  if (sessionId) {
    // if (!SESSION_DATA[sessionId]) {
    //   SESSION_DATA[sessionId] = {}
    // }
  } else {
    needSetCookie = true
    sessionId = `${Date.now()}_${Math.random()}`
    set(sessionId, {})
  }
  get(sessionId).then(data => {
    req.session = data

    // 处理postData
    getPostData(req).then(postData => {
      req.body = postData

      // 处理blog路由
      // const blogData = handleBlogRouter(req, res)
      // if (blogData) {
      //   res.end(JSON.stringify(blogData))
      //
      // }
      const blogDataResult = handleBlogRouter(req, res)
      if (blogDataResult) {
        blogDataResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `sessionId=${sessionId};path=/;httpOnly`
            )
          }
          res.end(JSON.stringify(blogData))
        })
        return
      }

      // 处理user路由
      const userDataResult = handleUserRouter(req, res)
      if (userDataResult) {
        userDataResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `sessionId=${sessionId};path=/;httpOnly`
            )
          }
          res.end(JSON.stringify(userData))
        })
        return
      }

      // 未命中路由
      res.writeHead(400, { 'content-type': 'text/plain' })
      res.write('404 Not Found')
      res.end()
    })
  })
}

module.exports = serverHandle
