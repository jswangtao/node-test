const http = require('http')

// 组合中间件
function compose(middleWareList) {
  return function(ctx) {
    function dispatch(i) {
      const fn = middleWareList[i]
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return dispatch(0)
  }
}

class LikeKoa2 {
  constructor() {
    this.middleWareList = []
  }

  use(fn) {
    this.middleWareList.push(fn)
    return this
  }
  createContext(req,res){
    const ctx ={
      req,
      res
    }
    ctx.query = req.query
    return ctx
  }
  callback() {
    const fn = compose(this.middleWareList)
    return (req, res) => {
      const ctx = this.createContext(req,res)
      return  fn(ctx)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2
