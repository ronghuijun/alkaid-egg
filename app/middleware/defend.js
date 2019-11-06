module.exports = (option, app) => {
    return async function (ctx, next) {
        if (app.redis.get(ctx.req.socket.remoteAddress)) {
            ctx.body = "太快了"
        }
        else {
            pp.redis.set(ctx.req.socket.remoteAddress, "1", "ex", 1);
            await next();
        }
    }
}