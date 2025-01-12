const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx, service } = this;
        
        await ctx.render("index.hbs",{user:ctx.session.user})
        
    }
    
    async login() {
        const { ctx, service } = this;
        await ctx.render("login.hbs")
    }

    async signup() {
        const { ctx, service } = this;
        await ctx.render("signup.hbs")
    }

    async test() {
        const { ctx, service } = this;
        const result = await service.github.setBaseAndGithub("1",'jihuayu/blog-gitalk')
        ctx.body = result;
    }
}

module.exports = HomeController;
