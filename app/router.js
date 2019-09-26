'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/authCallback', controller.home.index);

  app.passport.mount('github', {
    callbackURL: '/auth/github/callback',
    successRedirect: '/authCallback'
  });
  router.get('/', controller.home.index)
}
