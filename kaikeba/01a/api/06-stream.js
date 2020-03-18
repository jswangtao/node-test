const fs = require("fs")
const rs2 = fs.createReadStream("./img.png")
const ws2 = fs.createWriteStream("sss.png")

rs2.pipe(ws2)