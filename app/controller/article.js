const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() {
        const { ctx, service, app } = this;
        let url = await app.redis.get(ctx.host + "url");
        if (url) {
            let t = ctx.helper.name2raw(url);
            let curl_url = `${t}${ctx.url}`;
            let body = await app.redis.get(`${url}${ctx.url}`);
            if (!body) {
                body = (await ctx.curl(curl_url, {
                    dataType: 'text',
                    timeout: 3000
                })).data
                app.redis.set(`${url}${ctx.url}`, body, 'ex', 60);
            }
            if(ctx.url.endsWith('.md')){
                await ctx.render("md.hbs", { html: ctx.helper.md_render(body) })
            }
            else if(ctx.url.endsWith('.html')){
                ctx.body = body;
            }
            else{
                await ctx.render("code.hbs", { code: body })
            }
        }
        else {
            ctx.redirect('/auth/url')
        }

    }

    async url() {
        const { ctx, service, app } = this;
        let url = await app.redis.get(ctx.host + "url");
        if (url) {
            ctx.redirect('/auth/url')
        }
        else {
            await ctx.render('url.hbs')
        }
    }

    async url_p() {
        const { ctx, service, app } = this;
        const payload = ctx.request.body || {};
        let url = await app.redis.get(ctx.host + "url");
        if (url) {
            ctx.redirect('/auth/url')
        }
        else {
            await app.redis.set(ctx.host + "url", payload.url);
        }
    }
}

module.exports = ArticleController;
