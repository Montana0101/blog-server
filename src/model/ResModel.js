/**
 * @description res 的数据模型
 * @author montana
 */
class BaseModel {
  constructor(data, messaga) {
    //  this.errno = errno
    if (data) {
      this.data = data
    }
    if (messaga) {
      this.messaga = messaga
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data) {
    super({
      data,
    })
    this.errno = 0
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor(messaga) {
    super({
      messaga,
    })
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}
