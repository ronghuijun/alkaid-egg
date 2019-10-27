const moment = require('moment')
const crypto = require('crypto');
// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.no_login = ({ ctx, res = null, msg = '没有登录' }) => {
  ctx.body = {
    code: -1,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.can_not_login = ({ ctx, res = null, msg = '用户名或密码错误' }) => {
  ctx.body = {
    code: 100,
    data: res,
    msg
  }
  ctx.status = 200
}


exports.exist_name = ({ ctx, res = null, msg = '用户名已经存在' }) => {
  ctx.body = {
    code: 110,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.md5 = (password)=> {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}