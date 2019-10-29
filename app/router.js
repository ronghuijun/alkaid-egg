'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/api/auth/login', controller.auth.login)
  router.post('/api/auth/register',controller.auth.register)
  router.post('/api/auth/logout', controller.auth.logout)

  router.post('/api/user/update', controller.user.update)

  router.post('/api/project/create', controller.user.update)

  

};
