const moment = require('moment')

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


exports.jwt_sign = (data) => {
  const token = app.jwt.sign({ data: data, time: Math.floor(Date.now() / 1000) + app.config.jwt.time }, app.config.jwt.secret);
  return token;
}

exports.jwt_verify = async (token) => {
  let data;
  await jwt.verify(token, app.config.jwt.secret, function (err, decoded) {
    if (err)
      throw "token error";
    if (decoded.time < Math.floor(Date.now() / 1000))
      throw "thoken exceed";
    data = decoded.data;
  });
  return data;
}