'use strict';

module.exports = app => {
  const { router, controller } = app;
  // router.post('/api/auth/login', controller.auth.login);
  router.get('/index', controller.home.index);
  router.get('/', controller.home.index);
  
  router.get('/auth/login', controller.home.login);
  router.post('/auth/login', controller.auth.login);

  router.get('/auth/signup', controller.home.signup);
  router.post('/auth/signup', controller.auth.signup);
};
