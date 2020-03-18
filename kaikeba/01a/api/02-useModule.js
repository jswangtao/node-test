const os = require('os')
const mem = (os.freemem() / os.totalmem()) * 100
console.log(`内存占用${mem.toFixed(2)}%`)

const spuStat = require('cpu-stat')
const util = require('util')

// spuStat.usagePercent((err,percent)=>{
//   console.log(err);
//   console.log(`CPU占用${percent.toFixed(2)}%`);
// })

const getCpu = util.promisify(spuStat.usagePercent)

// getCpu().then((percent)=>{
//   console.log(`CPU占用${percent.toFixed(2)}%`);
// })

const showState = async () => {
  const mem = (os.freemem() / os.totalmem()) * 100
  console.log(`内存占用${mem.toFixed(2)}%`)
  const percent = await getCpu()
  console.log(`CPU占用${percent.toFixed(2)}%`);
}

module.exports = {
  showState
}
