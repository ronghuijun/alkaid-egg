const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() {
        const { ctx, service } = this;
        const url = ctx.host;
        let github = await service.github.getFromBase(url);
        if (!github) {
            ctx.redirect('/auth/url')
        }
        else {
            if (github.index_type == "html") {
                ctx.body = github.index_page;
            }
            else if (github.index_type == "md") {
                let html = ctx.helper.md_render(github.index_page);
                await ctx.render('md.hbs', { html: html })
            }
            else {
                throw { code: 404 };
            }
        }
    }

    async url() {
        const { ctx, service } = this;
        const url = ctx.host;
        let github = await service.github.getFromBase(url);
        if (github) {
            ctx.redirect('/')
        }
        else {
            await ctx.render('url.hbs')
        }
    }

    async url_p() {
        const { ctx, service } = this;
        const url = ctx.host;
        const payload = ctx.request.body || {};
        let github = await service.github.getFromBase(url);
        if (github) {
            ctx.redirect('/')
        }
        else {
            await service.github.setBaseAndGithub(url, payload.url);
            ctx.redirect('/')
        }
    }
}

module.exports = ArticleController;
