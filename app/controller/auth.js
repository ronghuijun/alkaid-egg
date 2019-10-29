const Controller = require('egg').Controller;

class AuthController extends Controller {
    async login() {
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        payload.password = ctx.helper.md5(payload.password);
        const user = await service.user.findOneByAuth(payload.name,payload.password);
        const res = {};
        if(user){
            ctx.session.userId = user._id;
            ctx.helper.success({ctx, res})
        }
        else {
            ctx.helper.can_not_login({ctx, res})
        }

    }

    async logout() {
        const { ctx, service } = this;
        this.ctx.session.userId = undefined;
        const res = {};
        ctx.helper.success({ctx, res})
    }

    async register() {
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        payload.password = ctx.helper.md5(payload.password);
        const user = await service.user.findOneByName(payload.name);
        if(user){
            let res = {};
            ctx.helper.exist_name({ctx,res})
        }
        else{
            const res = service.user.createByAuth(payload.name,payload.password,payload.email);
            ctx.session.userId = res._id;
            ctx.helper.success({ctx,res})
        }
    }
}

module.exports = AuthController;
