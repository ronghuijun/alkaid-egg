const Service = require('egg').Service

class ProjectService extends Service {
  async create(payload) {
    const { ctx, service } = this
    if(!ctx.session.userId)
        throw "no find user";
    payload.owner = ctx.session.userId;
    return ctx.model.Project.create(payload)
  }  

  async findOne(payload) {
    const { ctx, service } = this
    // user.password = await this.ctx.genHash(user.password)
    return ctx.model.Project.findOne(payload)
  }

}

module.exports = ProjectService