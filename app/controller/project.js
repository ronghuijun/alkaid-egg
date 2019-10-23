const Controller = require('egg').Controller

class ProjectController extends Controller {

    async create() {
        const { ctx, service } = this

        const payload = ctx.request.body || {}
        
        const res = await service.project.create(payload)

        ctx.helper.success({ctx, res})
    }
}

module.exports = ProjectController
