const Service = require('egg').Service;

class CommentService extends Service {
    async create(payload) {
        const { ctx, service } = this;
        // let comment = {
        //     owner:payload.owner,
        //     baseUrl:payload.baseUrl,
        //     blogUrl:payload.blogUrl,
        //     detile:payload.detile,
        // };
        delete  payload.createdAt;
        delete  payload._id;
        return ctx.model.Comment.create(payload);
    };

    async update(id,payload) {
        const { ctx, service } = this;
        delete  payload.createdAt;
        delete  payload._id;
        return ctx.model.Comment.update({_id:id},payload);
    };

    async delete(id,owner) {
        const { ctx, service } = this;
        return ctx.model.Comment.delete({_id:id,owner:owner});
    };

}

module.exports = CommentService;