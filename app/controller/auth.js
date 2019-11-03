const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx, service } = this;
        //TODO:验证密码
        const payload = ctx.request.body || {};
        const ans = await service.user.findOneByAuth(payload.name,payload.pasword);
        if(ans){
            ctx.session.user = ans.name;
            ctx.redirect('/')
        }
        else{
            await ctx.render("login.hbs",{error:1})  
        }
    }

    async signup() {
        const { ctx, service } = this;
        //TODO:验证密码
        const payload = ctx.request.body || {};
        const ans = await service.user.createByAuth(payload.name,payload.password,payload.email);
        if(ans){
            ctx.session.user = ans.name;
            ctx.redirect('/')
        }
        else{
            await ctx.render("signup.hbs",{error:1})  
        }
    }
}

module.exports = UserController;
