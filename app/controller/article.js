const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() {
        const { ctx, app } = this;
        let url = await app.redis.get(ctx.host + "url");
        if (url) {
            let t = ctx.helper.name2raw(url);
            let curl_url = `${t}${ctx.url}`;
            let body //= await app.redis.get(`${url}${ctx.url}`);
            let body_type = "html";
            if (!body) {
                body = (await ctx.curl(curl_url, {
                    dataType: 'text',
                    timeout: 3000
                })).data
                if (ctx.url.includes(".")) {
                    if (ctx.url.endsWith('.md')) {
                        body = ctx.helper.md_render(body)
                        body_type = 'md'
                    }
                    else if (ctx.url.endsWith('.html')) {
                        body_type = 'html'
                    }
                    else {
                        body_type = 'code'
                    }
                }
                else {
                    let ans = (await ctx.curl(curl_url + "index.html", {
                        dataType: 'text',
                        timeout: 3000
                    }))

                    if (ans.status==200) {
                        body_type = 'html'
                        body = ans.data
                    }
                    else {
                        let ans  = (await ctx.curl(curl_url + "index.md", {
                            dataType: 'text',
                            timeout: 3000
                        }))
                        if (ans.status==200) {
                            body = ctx.helper.md_render(body)
                            body_type = 'md'
                            body = ans.data
                        }
                        else{
                            ctx.redirect(`${ctx.url}README.md`)
                        }
                    }
                }
                app.redis.set(`${url}${ctx.url}`, body, 'ex', 60);
            }
            if (body_type == 'md') {
                await ctx.render("md.hbs", { html: body })
            }
            else if (body_type == 'html') {
                ctx.body = body;
            }
            else {
                await ctx.render("code.hbs", { code: body })
            }
        }
        else {
            ctx.redirect('/auth/url')
        }
    }

    async url() {
        const { ctx, app } = this;
        let url = await app.redis.get(ctx.host + "url");
        if (url) {
            let t = ctx.helper.name2raw(url);
            let ans  = (await ctx.curl(t + "index.md", {
                dataType: 'text',
                timeout: 3000
            }))
            if(ans.status==200&&ans.data==ctx.host)
                ctx.redirect('/')
            else{
                await app.redis.del(ctx.host + "url")
                await ctx.render('url.hbs')
            }
        }
        else {
            await ctx.render('url.hbs')
        }
    }

    async url_p() {
        const { ctx, app } = this;
        const payload = ctx.request.body || {};
        let url = await app.redis.get(ctx.host + "url");
        if (url) {
            let t = ctx.helper.name2raw(url);
            let ans  = (await ctx.curl(t + "index.md", {
                dataType: 'text',
                timeout: 3000
            }))
            if(ans.status==200&&ans.data==ctx.host)
                ctx.redirect('/')
            else{
                await app.redis.del(ctx.host + "url")
                await ctx.render('url.hbs')
            }
        }
        else {
            await app.redis.set(ctx.host + "url", payload.url);
        }
    }
}

module.exports = ArticleController;
