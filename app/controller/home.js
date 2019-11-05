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
        const result = await ctx.curl('https://dev.tencent.com/u/ymz16193335/p/test/git/raw/master/assets/0x_trans_fix/lang/zh_cn.lang', {
            dataType: 'text',
            timeout: 3000
        })
       
        ctx.body = result;
    }
}

module.exports = HomeController;
docker run --name jenkins --user=root -p 8080:8080 -p 50000:50000 -v /opt/data/jenkins_home:/var/jenkins_home -d jenkins/jenkins:lts
