const express = require("./kpress")

const app = express()
app.get("/",(req,res)=>{
  // abc()
  res.end("hello,world-----kpress")
})

app.get("/users",(req,res)=>{
  res.end(JSON.stringify({name:"tom",age:26}))
})

app.listen(3000,()=>{
  console.log("Example app listen at 3000");
})