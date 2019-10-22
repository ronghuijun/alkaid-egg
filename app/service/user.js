const Service = require('egg').Service

class UserService extends Service {
  async create(user) {
    const { ctx, service } = this
    // user.password = await this.ctx.genHash(user.password)
    return ctx.model.User.create(user)
  }  
}

module.exports = UserService