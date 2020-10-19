/**
 * @description user controller
 * @author montana
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
const { User, Blog } = require('../db/model')

/**
 * 用户名是否已存在
 * @param {string} userName
 */

async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 统一返回格式
}

const userRegister = async (userName, password, realName = {}) => {
  const result = await User.create({
    userName,
    password,
    realName,
  })
  return result
    ? new SuccessModel(result.dataValues)
    : new ErrorModel('注册失败')
}

const userLogin = async (userName, password) => {
  const result = await User.findOne({
    where: {
      userName: userName,
      password: password,
    },
  })

  return result
    ? new SuccessModel(result.dataValues)
    : new ErrorModel('账号密码不匹配')
}

// 管理员详情列表
const getAdminInfo = async (author, pageNo, pageSize) => {
  const result = await User.findAndCountAll({
    where: {
      userName: author,
    },
    include: [
      {
        model: Blog,
        limit: Number(pageSize),
        offset: Number((pageNo - 1) * pageSize),
        order: [['id', 'desc']],
      },
    ],
  })
  return new SuccessModel({
    data: result.rows.map((item) => item.dataValues)[0],
  })
}

// 获取管理员详情列表总数
const getAdminInfoTotal = async (author) => {
  const result = await User.findAndCountAll({
    where: {
      userName: author,
    },
    include: [
      {
        model: Blog,
      },
    ],
  })
  return new SuccessModel({
    total: result.rows.map((item) => item.dataValues)[0].blogs.length,
  })
}

// 记录网站当前访问量
const recordAccessCount = async (count) => {
  const result = await User.findOne()
  count += Number(result.dataValues.accessRecord)
  User.update(
    {
      accessRecord: count,
    },
    {
      where: {},
    }
  )
  return new SuccessModel(count)
}

module.exports = {
  isExist,
  userRegister,
  userLogin,
  getAdminInfo,
  getAdminInfoTotal,
  recordAccessCount,
}
