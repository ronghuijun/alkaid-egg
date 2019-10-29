const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    payload.owner = ctx.session.user;
    service.comment.create(payload);
    ctx.helper.success({ctx})
  }

  async change() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    payload.owner = ctx.session.user;
    service.comment.update(payload);
    ctx.helper.success({ctx})
  }

  async delete() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    payload.owner = ctx.session.user;
    service.comment.delete(payload);
    ctx.helper.success({ctx})
  }
}

module.exports = CommentController;
