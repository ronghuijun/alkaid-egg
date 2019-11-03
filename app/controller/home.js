const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx, service } = this;
        await ctx.render("index.hbs",{title:"ll",body:"lll"})
    }
    async login() {
        const { ctx, service } = this;
        await ctx.render("login.hbs")
    }
    async signup() {
        const { ctx, service } = this;
        await ctx.render("signup.hbs")
    }
}

module.exports = UserController;
