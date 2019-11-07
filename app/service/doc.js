const Service = require('egg').Service;

class DocService extends Service {

    async findDoc(github, file) {
        const { ctx, service } = this;
        let ans = await ctx.model.Url.findOne({ github_url: github, github_file: file });
        if (ans) {
            if (new Date().getTime() - ans.updated.getTime() < 60 * 60 * 1000)
                return { data: ans.str, type: ans.str_type };
            else {
                return await this.updateDocAndTime(github, file);
            }
        }
        else {
            return await this.createDoc(github, file);
        }
    }

    async createDoc(github, file) {
        const { ctx, service } = this;

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
                await ctx.model.Url.create({ github_url: github, github_file: file, str: ans.data, str_type: 'code', updated: new Date() });
                return { data: ans.data, type: 'code' };
            }
        }
        else {
            throw { status: 504 }
        }
    }


    async updateDocAndTime(github, file) {
        const { ctx, service } = this;
        let ans0 = await ctx.model.Url.findOne({ github_url: github, github_file: file });
        if (ans0) {
            let id = ans0._id;
            let ans = await ctx.helper.requestGithub(ctx, github, file);
            if (ans.status == 200) {
                if (file.endsWith('html')) {
                    await ctx.model.Url.update({ _id: id }, { github_url: github, github_file: file, str: ans.data, str_type: 'html', updated: new Date() });
                    return { data: ans.data, type: 'html' };
                }
                else if (file.endsWith('md')) {
                    await ctx.model.Url.update({ _id: id }, { github_url: github, github_file: file, str: ans.data, str_type: 'md', updated: new Date() });
                    return { data: ans.data, type: 'md' };
                }
                else {
                    await ctx.model.Url.update({ _id: id }, { github_url: github, github_file: file, str: ans.data, str_type: 'code', updated: new Date() });
                    return { data: ans.data, type: 'code' };
                }
            }
            else {
                throw { status: 504 }
            }
        }else {
            return await this.createDoc(github, file);
        }
    }

}

module.exports = DocService;