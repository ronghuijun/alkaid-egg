const Controller = require('egg').Controller;
const yaml = require('js-yaml');

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

    async doc() {
        const { ctx, service } = this;
        const url = ctx.host;
        let github = await service.github.getFromBase(url);

        if (!github) {
            ctx.redirect('/auth/url');
        }
        else {
            if (!github.doc_type) {
                throw { code: 404 }
            }
            else {
                if (github.doc_type == "html") {
                    ctx.body = github.doc_index;
                    return;
                }
                else if (github.doc_type == "md") {
                    let main = ctx.helper.md_render(github.doc_index);
                    let side = ctx.helper.md_render(github.doc_side);
                    await ctx.render('doc.hbs', { main: main, side: side });
                }
                else {
                    throw { code: 404 };
                }
            }


        }
    }

    async docs() {
        const { ctx, service } = this;
        const url = ctx.host;
        let github = await service.github.getFromBase(url);
        if (!github) {
            ctx.redirect('/auth/url');
        }
        else {
            if (github.github_url) {
                let ans = await service.doc.findDoc(github.github_url, ctx.url)
                if (ans.type == 'html') {
                    await ctx.render('doc.hbs', { main: ans.data, side: github.doc_side })
                }
                else if (ans.type == 'md') {
                    let html = ctx.helper.md_render(ans.data)
                    await ctx.render('doc.hbs', { main: html, side: github.doc_side })
                }
                else {
                    throw { code: 404 }
                }
            }
            else {
                throw { code: 404 }
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
