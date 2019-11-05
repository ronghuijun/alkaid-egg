// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
}

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}

exports.jwt = {
  enable: false,
  package: 'egg-jwt',
}

exports.cors = {
  enable: true,
  package: 'egg-cors',
}

// exports.passportGithub = {
//   enable: true,
//   package: 'egg-passport-github',
// };

// exports.passport = {
//   enable: true,
//   package: 'egg-passport',
// };


exports.handlebars = {
  enable: true,
  package: 'egg-view-handlebars',
};



exports.redis = {
  enable: true,
  package: 'egg-redis',
};