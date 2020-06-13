const { User, Blog } = require('../db/model')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 获取博客列表
const getBlogs = async (pageNo, pageSize, classify) => {
  //   let newClass = Array(classify)
  //   console.log('测试打撒撒旦', classify)
  if (classify == '[]') {
    const result = await Blog.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'realName'],
        },
      ],
      limit: Number(pageSize),
      offset: Number((pageNo - 1) * pageSize),
      order: [['id', 'desc']],
    })
    const count = result.count
    const list = result.rows.map((item) => item.dataValues)
    return result
      ? new SuccessModel({
          count,
          list,
        })
      : new ErrorModel('获取列表失败')
  } else {
    let newClass = JSON.parse(classify)
    //  console.log('csahdui是大坏蛋活塞is', newClass)
    const result = await Blog.findAndCountAll({
      where: {
        classify: {
          [Op.like]: `%${newClass}%`,
        },
      },
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'realName'],
        },
      ],
      limit: Number(pageSize),
      offset: Number((pageNo - 1) * pageSize),
      order: [['id', 'desc']],
    })
    const count = result.count
    const list = result.rows.map((item) => item.dataValues)
    return result
      ? new SuccessModel({
          count,
          list,
        })
      : new ErrorModel('获取列表失败')
  }
}

// 添加博客
const appendBlog = async (data) => {
  const { title, content, userId, classify, imgUrl } = data
  const result = await Blog.create({
    title,
    content,
    userId,
    imgUrl,
    classify,
    createTime: Date.now(),
  })
  return result
    ? new SuccessModel(result.dataValues)
    : new ErrorModel('添加博客失败')
}

// 博客详情
const getDetail = async (id) => {
  const result = await Blog.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
  return result
    ? new SuccessModel(result.dataValues)
    : new ErrorModel('未找到对应博客数据')
}

// 更新博客
const updateBlog = async (id, data) => {
  const { title, content, userId, imgUrl, classify } = data
  const result = await Blog.update(
    {
      title,
      content,
      userId,
      imgUrl,
      classify,
    },
    {
      where: {
        id: id,
      },
    }
  )
  return new SuccessModel(result[0] > 0 ? '更新成功' : '更新失败')
}

// 删除博客
const deleteBlog = async (id, userId) => {
  const result = await Blog.destroy({
    where: {
      id: id,
      userId,
    },
  })
  return new SuccessModel(result > 0 ? '删除成功' : '删除失败')
}

module.exports = {
  appendBlog,
  getBlogs,
  getDetail,
  updateBlog,
  deleteBlog,
}
