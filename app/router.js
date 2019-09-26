'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/authCallback', controller.home.index);
  router.get('/', controller.home.index1);
  router.get('/logout', controller.home.logout);
  
  app.passport.mount('github', {
    callbackURL: '/auth/github/callback',
    successRedirect: 'https://github.com/'
  });
  router.get('/', controller.home.index)
}
