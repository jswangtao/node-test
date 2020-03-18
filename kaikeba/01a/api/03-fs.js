const fs  = require("fs")
const path = require("path")
// const data = fs.readFileSync("./02-useModule.js")
// console.log(data.toString());

fs.readFile(path.resolve(__dirname,"./index.js"),(err,data)=>{
  console.log(data.toString());
})