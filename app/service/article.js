const Service = require('egg').Service;

class ArticleService extends Service {
    async create(payload) {
        const { ctx, service } = this;
        delete payload._id;
        delete payload.createdAt;
        return ctx.model.Article.create(payload);
    };


    async addReadNum(id) {
        const { ctx, service } = this;
        const readNum = ctx.model.Article.findOneById(id).readNum;
        return ctx.model.Blog.update({_id:id},{readNum:readNum+1});
    };

    async addReadTime(id,time) {
        const { ctx, service } = this;
        const readTime = ctx.model.Article.findOneById(id).readTime;
        return ctx.model.Blog.update({_id:id},{readNum:readNum+time});
    };

    async addCommentNum(id) {
        const { ctx, service } = this;
        const commentNum = ctx.model.Article.findOneById(id).commentNum;
        return ctx.model.Blog.update({_id:id},{commentNum:commentNum+1});
    };
}

module.exports = ArticleService;