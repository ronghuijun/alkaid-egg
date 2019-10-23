const Service = require('egg').Service

class UserService extends Service {
  async create(payload) {
    const { ctx, service } = this
    // user.password = await this.ctx.genHash(user.password)
    return ctx.model.User.create(user)
  }  

  async find(payload) {
    const { ctx, service } = this
    // user.password = await this.ctx.genHash(user.password)
    return ctx.model.User.find(payload)
  }  

}

module.exports = UserService