const Sequelize = require('sequelize')
const seq = require('./seq.js')

const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  realName: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'User测试备注',
  },
})

const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  classify: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createTime: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
})

// 外键关联
Blog.belongsTo(User, {
  foreignKey: 'userId',
})

User.hasMany(Blog, {
  foreignKey: 'userId',
})

module.exports = { User, Blog }
