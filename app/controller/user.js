const Controller = require('egg').Controller;

class UserController extends Controller {
    async update() {
        const { ctx, service } = this;

        const payload = ctx.request.body || {};
        if(ctx.session.userId){
            const res = await service.user.update(ctx.session.userId,payload);
            ctx.helper.success({ctx, res})
        }
        else{
            const res = {};
            ctx.helper.no_login({ctx, res})
        }
    }
}

module.exports = UserController;
