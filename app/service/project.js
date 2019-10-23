const Service = require('egg').Service

class ProjectService extends Service {
  async create(payload) {
    const { ctx, service } = this
    if(!ctx.session.userId)
        throw "no find user";
    payload.owner = ctx.session.userId;
    return ctx.model.Project.create(payload)
  }  

}

module.exports = ProjectService