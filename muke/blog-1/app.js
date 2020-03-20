const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

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
  let userId = req.cookie.userId
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  console.log(SESSION_DATA[userId],222);

  
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
          res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly`)
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
          res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly`)
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
}

module.exports = serverHandle
