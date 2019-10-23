const Controller = require('egg').Controller

class AuthController extends Controller {
    async login() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        const user = await service.user.findOne(payload);
        this.ctx.session.userId = user._id;
        const res = {}
        ctx.helper.success({ctx, res})
    }

    async logout() {
        const { ctx, service } = this
        this.ctx.session.userId = null;
        const res = {}
        ctx.helper.success({ctx, res})
    }

}

module.exports = AuthController
