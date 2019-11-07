module.exports = (option, app) => {
    return async function (ctx, next) {
        let host = ctx.host;
        let url = ctx.url.split('?')[0];
        let is_edit = ctx.query['edit'];
        if (is_edit) {
            let i = await ctx.service.github.getFromBase(host);
            let ans = await ctx.helper.requestGithub(ctx, i.github_url, url)
            if (ans.status == 200) {
                console.log(ans.data)
                let lang = url.split('.').pop();
                lang = change[lang]?change[lang]:lang;
                await ctx.render('edit.hbs', { code: ans.data ,lang:lang  })
            }
            else {
                throw { status: 404 };
            }
        }
        else{
            await next();
        }
    }
}

const change = {
    'js':'javascript',
    'ts': 'typescript',
    'md': 'markdown',
    'yml': 'yaml',
    'cs': 'csharp'
}