const Controller = require('egg').Controller

class AuthController extends Controller {
    async login() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        
        const user = await service.user.find(payload);

        this.ctx.session.name = user.name;
        const res = {}
        ctx.helper.success({ctx, res})
    }

    async logout() {
        const { ctx, service } = this
        this.ctx.session.name = null;
        const res = {}
        ctx.helper.success({ctx, res})
    }

}

module.exports = AuthController
