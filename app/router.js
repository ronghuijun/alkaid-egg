'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/register',controller.auth.register);
  router.post('/api/auth/logout', controller.auth.logout);

  router.post('/api/user/update', controller.user.update);

  router.post('/api/blog/create', controller.blog.create);

  router.post('/api/article/create', controller.article.create);

  router.post('/api/comment/create', controller.comment.create);
  router.post('/api/comment/update', controller.comment.update);
  router.post('/api/comment/delete', controller.comment.delete);

  

};
