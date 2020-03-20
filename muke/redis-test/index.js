const redis = require('redis');


// 创建客户端
const redisClient = redis.createClient("6379",'localhost')

redisClient.on('error',err=>{
  console.error(err)
})

// 测试
redisClient.set('myname','zhangshan',redis.print)

redisClient.get('myname',(err,val)=>{
  if (err) {
    console.error(err)
    return
  }
  console.log('val',val);
  redisClient.quit()
})