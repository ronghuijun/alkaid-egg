'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/api/login', controller.auth.login)
  router.post('/api/register',controller.auth.register)
  router.post('/api/logout', controller.auth.logout)
  router.post('/api/user/update', controller.user.update)

}
