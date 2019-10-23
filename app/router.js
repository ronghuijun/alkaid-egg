'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/api/user', controller.user.create)
  router.post('/api/login', controller.auth.login)
  router.post('/api/logout', controller.auth.logout)
  

  router.post('/api/project/create', controller.project.create)
  router.post('/api/logout', controller.auth.logout)


}
