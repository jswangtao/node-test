const path = require('path')
const fs = require('fs')
// let myPath = path.join(__dirname,'/img/so');
// let myPath2 = path.join(__dirname,'./img/so');
// let myPath3=path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');

// console.log(__dirname);
// console.log(myPath);
// console.log(myPath2);
// console.log(myPath3);

// let myPath = path.join(__dirname,'/img/so');
// let myPath2 = path.join(__dirname,'./img/so');
// let myPath3=path.join('/foo/bar', './baz');
// let myPath4=path.join('/foo/bar', '/tmp/file/');

// console.log(__dirname);
// console.log(myPath);
// console.log(myPath2);
// console.log(myPath3);
// console.log(myPath4);

// callback 获取文件内容
// function getFileContent(filename, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', filename)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     callback(JSON.parse(data.toString()))
//   })
// }

// getFileContent("a.json",(aData)=>{
//   console.log("a data",aData);
//   getFileContent(aData.next,bData=>{
//     console.log("b data",bData);
//   })
// })

function getFileName(filename) {
  const fullFileName = path.resolve(__dirname, 'files', filename)
  const promise = new Promise((resolve, reject) => {
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        console.log(1111)
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

// getFileName('a.json')
//   .then(aData => {
//     console.log(aData)
//     return getFileName(aData.next)
//   })
//   .then(bData => {
//     console.log(bData)
//     return getFileName(bData.next)
//   })
//   .then(cData => {
//     console.log(cData)
//     // return getFileName(cData.next)
//   })

async function readFileData() {
    const aData = await getFileName('a.json')
    console.log('aData', aData)
    const bData = await getFileName(aData.next)
    console.log('bData', bData)
    const cData = await getFileName(bData.next)
    console.log('cData', cData)
 
}

readFileData()
