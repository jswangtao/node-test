const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      createTime: 1584539365729,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      createTime: 1584539365729,
      author: 'zhangsan'
    }
  ]
}

const getDetail = (id) => {
  return  {
    id: 1,
    title: '标题1',
    content: '内容1',
    createTime: 1584539365729,
    author: 'zhangsan'
  }
}

const newBlog = (blogData ={}) => {
  return  {
    id: 3
  }
}

const updateBlog = (id,blogData ={}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
