'use strict';

module.exports = app => {
  const { router, controller } = app;


  // router.get('/', controller.home.test);

  // router.get('/auth/login', controller.home.login);
  // router.post('/auth/login', controller.auth.login);

  // router.get('/auth/signup', controller.home.signup);
  // router.post('/auth/signup', controller.auth.signup);

  // router.get('/auth/logout', controller.auth.logout);
  router.get('/auth/url', controller.article.url);
  router.post('/auth/url', controller.article.url_p);

  router.get('/', controller.article.index);
  router.get('/doc', controller.article.doc);
  router.get('/doc/**', controller.article.docs);
  router.get('/**', controller.article.all);

};
