const { getList,getDetail,newBlog,updateBlog ,delBlog} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/baseModel')

const handleBlogRouter = (req, res) => {
  const method = req.method

  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id,req.body)
    if (result) {
      return new SuccessModel("成功更新")
    }else{
      return new ErrorModel("失败更新")
    }
   
  }
  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id)
    if (result) {
      return new SuccessModel("成功删除")
    }else{
      return new ErrorModel("失败删除")
    }
  }
}

module.exports = handleBlogRouter
