const express = require('../like-express/like-express')
// const express = require('express')

// http请求实例
const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // 假设在处理cookie
  req.cookie = {
    userId: '123'
  }
  next()
})

app.use((req, res, next) => {
  // 假设在处理post data
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  }, 0)
})

app.use('/api',(req,res,next)=>{
  console.log('处理api路由');
  next()
})

app.get('/api',(req,res,next)=>{
  console.log('get,处理api路由');
  next()
})

app.post('/api',(req,res,next)=>{
  console.log('post,处理api路由');
  next()
})

// 模拟登陆验证
function loginCheck(req,res,next) {
  setTimeout(() => {
    console.log('模拟登陆成功');
    next()
  }, 1000);
}

app.get('/api/get-cookie',loginCheck,(req,res,next)=>{
  console.log('get-cookie,处理api路由');
  res.json({
    errno:0,
    data:req.cookie
  })
})

app.listen(8000,()=>{
  console.log('server is listening 8000');
})




