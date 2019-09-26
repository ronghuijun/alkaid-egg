const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = JSON.stringify(this.ctx.user)
  }
  async index1() {
    this.ctx.body = JSON.stringify(this.ctx.user)
  }
  async logout() {
    this.ctx.logout()
  }
}

module.exports = HomeController
