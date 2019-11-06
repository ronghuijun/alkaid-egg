const Service = require('egg').Service;

class GithubService extends Service {

    async getFromBase(url) {
        const { ctx, service } = this;
        return ctx.model.Github.findOne({ base_url: url });
    }

    async getFromBaseAndGithub(base, github) {
        const { ctx, service } = this;
        return ctx.model.Github.findOne({ base_url: base, github_utl: github });
    }

    async setBaseAndGithub(base, github) {
        const { ctx } = this;
        let ans = await this.requestGithub(github)
        let old = await this.getFromBase(base)
        console.log(old)
        if (old) {
            return ctx.model.Github.update({ _id: old.id }, { ...ans, base_url: base, github_utl: github })
        }
        else{
            return ctx.model.Github.create({ ...ans, base_url: base, github_utl: github })
        }

    }

    async requestGithub(url) {
        let ans = await this.requestGithubIndex(url);
        let github = {};
        if (ans) {
            github.index_page = ans.data;
            github.index_type = ans.type;
        }
        else {
            throw { code: 504 };
        }
        ans = await this.requestGithubDoc(url);
        if (ans) {
            if (ans.type == 'html') {
                github.doc_index = ans.data;
            }
            else {
                github.doc_yml = ans.data;
            }
        }
        return github;
    }

    async requestGithubIndex(github) {
        const { ctx } = this;
        let ans = await ctx.helper.requestGithub(ctx, github, 'index.html')
        if (ans.status != 200) {
            let ans = await ctx.helper.requestGithub(ctx, github, 'index.md')
            if (ans.status != 200) {
                return undefined
            }
            else {
                return { type: 'md', data: ans.data };
            }
        }
        else {
            return { type: 'html', data: ans.data };
        }
    }

    async requestGithubDoc(github) {
        const { ctx } = this;
        let ans = await ctx.helper.requestGithub(ctx, github, 'doc/index.html')
        if (ans.status != 200) {
            let ans = await ctx.helper.requestGithub(ctx, github, 'doc/summary.yml')
            if (ans.status != 200) {
                return undefined
            }
            else {
                return { type: 'yml', data: ans.data };
            }
        }
        else {
            return { type: 'html', data: ans.data };
        }
    }

}

module.exports = GithubService;