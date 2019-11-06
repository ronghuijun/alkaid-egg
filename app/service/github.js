const Service = require('egg').Service;

class GithubService extends Service {

    async getFromBase(url) {
        const { ctx, service } = this;
        let ans = await ctx.model.Github.findOne({ base_url: url });
        if (new Date().getTime() - ans.updated > 60 * 60 * 1000) {
            this.updateGithub(ans._id, url, ans.github_url);
        }
        return ans;
    }

    // async getFromBaseAndGithub(base, github) {
    //     const { ctx, service } = this;
    //     return ctx.model.Github.findOne({ base_url: base, github_url: github });
    // }

    async setBaseAndGithub(base, github) {
        const { ctx } = this;
        let ans = await this.requestGithub(github)
        let old = await this.getFromBase(base)
        if (old) {
            return await ctx.model.Github.update({ _id: old.id }, { ...ans, base_url: base, github_url: github })
        }
        else {
            return await ctx.model.Github.create({ ...ans, base_url: base, github_url: github })
        }

    }

    async updateGithub(id, base, github) {
        const { ctx } = this;
        let ans = await this.requestGithub(github)
        let obj = { ...ans, base_url: base, github_url: github, updated: new Date() };
        await ctx.model.Github.update({ _id: id },obj )
        return obj;
    }

    async requestGithub(url) {
        let ans = await this.requestGithubIndex(url);
        let github = {};
        if (ans) {
            github.index_page = ans.data;
            github.index_type = ans.type;
        }
        else {
            throw { status: 504 };
        }
        ans = await this.requestGithubDoc(url);
        if (ans) {
            github.doc_type = ans.type;
            if (ans.type == 'html') {
                github.doc_index = ans.data;
            }
            else if (ans.type == 'md') {
                github.doc_side = ans.side;
                github.doc_index = ans.index;
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
            let ans = await ctx.helper.requestGithub(ctx, github, 'doc/summary.md')
            if (ans.status != 200) {
                return undefined
            }
            else {
                let side = ans.data;
                let ans1 = await ctx.helper.requestGithub(ctx, github, 'doc/index.md')
                return { type: 'md', side: side, index: ans1.data };
            }
        }
        else {
            return { type: 'html', data: ans.data };
        }
    }

}

module.exports = GithubService;