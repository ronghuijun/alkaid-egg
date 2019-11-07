module.exports = (option, app) => {
    return async function (ctx, next) {
        let ip = ctx.req.socket.remoteAddress
        let times = app.redis.get(ip);
        if (times < 5) {
            app.redis.set(ip, times + 1, 'ex', '5')
            await next();
        }
        else {
            throw { statue: 300 }
        }
    }
}