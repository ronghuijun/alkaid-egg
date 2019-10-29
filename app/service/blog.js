const Service = require('egg').Service;

class BlogService extends Service {
    async create(payload) {
        const { ctx, service } = this;
        delete payload._id;
        delete payload.createdAt;
        delete payload.readNum;
        delete payload.readTime;
        delete payload.commentNum;
        return ctx.model.Blog.create(payload);
    };

    async addReadNum(id) {
        const { ctx, service } = this;
        const readNum = ctx.model.Blog.findOneById(id).readNum;
        return ctx.model.Blog.update({_id:id},{readNum:readNum+1});
    };

    async addReadTime(id,time) {
        const { ctx, service } = this;
        const readTime = ctx.model.Blog.findOneById(id).readTime;
        return ctx.model.Blog.update({_id:id},{readNum:readNum+time});
    };

}

module.exports = BlogService;