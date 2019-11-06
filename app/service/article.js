const Service = require('egg').Service;

class ArticleService extends Service {

  async cheakUrl(url) {
    const { app } = this;
    return app.redis.get(url)
  }

  async setUrl(name) {
    const { ctx, service } = this;
    return ctx.model.User.findOne({ name: name })
  }

  async createByAuth(name, password, email) {
    const { ctx, service } = this;
    const user = { name: name, password: password, email: email };
    return ctx.model.User.create(user)
  }

  async update(id, user) {
    const { ctx, service } = this;
    delete user.name;
    delete user.password;
    delete user._id;
    return ctx.model.User.update({ _id: id }, user)
  }
}

module.exports = ArticleService;