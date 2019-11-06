const moment = require('moment')
const crypto = require('crypto');
const md = require('markdown-it')();
const hljs = require('highlight.js')
exports.isobj = function (conditional, options) {
  if (typeof conditional == 'object') {
    options.fn(this);
  } else {
    options.inverse(this);
  }
};

exports.render_md = (str) => {
  return md.render(str);
}

exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    status: 0,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.no_login = ({ ctx, res = null, msg = '没有登录' }) => {
  ctx.body = {
    status: -1,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.can_not_login = ({ ctx, res = null, msg = '用户名或密码错误' }) => {
  ctx.body = {
    status: 100,
    data: res,
    msg
  }
  ctx.status = 200
}


exports.exist_name = ({ ctx, res = null, msg = '用户名已经存在' }) => {
  ctx.body = {
    status: 110,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.md5 = (password) => {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}

exports.name2raw = (name) => {
  return `https://raw.githubusercontent.com/${name}/master/`
}

exports.md_render = (str) => {
  return md.render(str);
}

exports.code_render = (str) => {
  console.log(hljs.highlightAuto(str).value)
  return hljs.highlightAuto(str).value;
}

exports.requestGithub = async (ctx, github, file) => {
  let ans;
  try {
    ans = await ctx.curl(ctx.helper.name2raw(github) + file, {
      dataType: 'text',
      timeout: 3000
    })
  }
  catch{
    console.log("超时")
    ans = {};
    ans.status = 0;
  }
  console.log('curl' + ctx.helper.name2raw(github) + file + ":" + ans)
  return ans;
}