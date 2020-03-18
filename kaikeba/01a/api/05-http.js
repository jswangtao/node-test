const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  // console.log(getProtoTypeChain(res));
  // res.end("hello world!!")
  const { url, method ,headers} = req
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  }else if(url === "/users" && method==="GET"){
    res.writeHead(200,{"Content-Type":"application/json"})
    res.end(JSON.stringify({"name":"abc"}))
  }else if (method === "GET" && headers.accept.indexOf("image/*") !== -1){
    fs.createReadStream("." + url).pipe(res)
  }
})

server.listen(3000)

function getProtoTypeChain(obj) {
  const protoChain = []
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj)
  }
  protoChain.push(null)
  return protoChain
}
