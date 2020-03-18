const KKB = require('./kkb')
const app = new KKB()

// app.use((req,res)=>{
//   res.writeHead(200)
//   res.end("hhhhhhhh")
// })

// app.use(ctx=>{
//   ctx.body = "hahhah"
// })

app.use(async (ctx, next) => {
  ctx.body = '1'
  await next()
  ctx.body += '2'
})
app.use(async (ctx, next) => {
  ctx.body += '3'
  await next()
  ctx.body += '4'
})
app.use(async (ctx, next) => {
  ctx.body += '5'
})

app.listen(3000)
