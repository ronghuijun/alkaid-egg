const path = require('path');
const fs = require('fs');
module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513771679145_1619';

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  }
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      '*'
    ],
  };

  config.multipart = {
    fileExtensions: ['.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov'], // 增加对 .apk 扩展名的支持
  };

  config.bcrypt = {
    saltRounds: 10 // default 10
  };

  config.mongoose = {
    url: 'mongodb://47.100.255.13/test',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  config.session = {
    key: 'SESSION_ID',
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
    encrypt: true,
    renew: true 
  };

  config.jwt = {
    secret: 'Great4-M',
    time: 60 * 60,
    enable: true,
    match: '/jwt',
  }

  config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.hbs',
    mapping: {
      '.hbs': 'handlebars',
    },
  };
  return config
}
