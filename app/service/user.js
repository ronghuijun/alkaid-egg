const Service = require('egg').Service

class UserService extends Service {
  async create(payload) {
    const { ctx, service } = this
    return ctx.model.User.create(payload)
  }

  async findOne(payload) {
    const { ctx, service } = this
    return ctx.model.User.findOne(payload)
  }

  async findOneByName(name) {
    const { ctx, service } = this
    return ctx.model.User.findOne({ name: name })
  }

  async findOneByAuth(name, password) {
    const { ctx, service } = this
    return ctx.model.User.findOne({ name: name, password: password })
  }

  async findOneById(id) {
    const { ctx, service } = this
    return ctx.model.User.findOne({ _id: id })
  }

  async createByAuth(name, password, email) {
    const { ctx, service } = this
    const user = { name: name, password: password, email: email }
    return ctx.model.User.create(user)
  }

  async update(id, user) {
    const { ctx, service } = this
    if (user.name || user.password || user._id) {
      throw "error"
    }
    return ctx.model.User.update({ _id: id }, user)
  }
}

module.exports = UserService