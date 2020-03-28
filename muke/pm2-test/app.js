const http = require('http')

const server = http.createServer((req, res) => {
  // 模拟日志
  console.log("cur time", Date.now())
  // 假装出错
  console.error("假装出错",Date.now())

  // 模拟一个错误
  if (req.url==="error") {
    throw new Error("/error 出错了")
  }
  

  res.setHeader("content-type","application/json")
  
  res.end(
    JSON.stringify({
      erron: 0,
      msg: 'pm2 test'
    })
  )
})

server.listen(3000)
console.log("server is listen 3000");
