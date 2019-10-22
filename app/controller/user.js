const Controller = require('egg').Controller

class UserController extends Controller {
    async create() {
        const { ctx, service } = this

        const payload = ctx.request.body || {}
        
        const res = await service.user.create(payload)

        ctx.helper.success({ctx, res})
    }
}

module.exports = UserController
