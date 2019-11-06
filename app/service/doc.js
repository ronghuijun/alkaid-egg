const Service = require('egg').Service;

class DocService extends Service {

    async findDoc(github, file) {
        const { ctx, service } = this;
        let ans = await ctx.model.Url.findOne({ github_url: github, github_file: file });
        if (ans)
            return { data: ans.str, type: ans.str_type };
        else {
            let ans = await ctx.helper.requestGithub(ctx, github, file);
            if (ans.status == 200) {
                if (file.endsWith('html')) {
                    await ctx.model.Url.create({ github_url: github, github_file: file, str: ans.data, str_type: 'html' });
                    return { data: ans.data, type: 'html' };
                }
                else if (file.endsWith('md')) {
                    await ctx.model.Url.create({ github_url: github, github_file: file, str: ans.data, str_type: 'md' });
                    return { data: ans.data, type: 'md' };
                }
                else {
                    throw { code: 504 }
                }
            }
            else {
                throw { code: 504 }
            }
        }
    }
}

module.exports = DocService;