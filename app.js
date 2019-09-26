module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    // 检查用户
    const existsUser = await ctx.model.User.findOne({ id: user.id });
    if (existsUser) {
      return existsUser;
    }
    const user1 = {
      id: user.id,
      name: user.name,
      displayName: user.displayName,
      avatar: user.photo,
    }
    const newUser = await ctx.model.User.create(user1);
    return newUser;
  });
  
  app.passport.serializeUser(async (ctx, user) => {
    return user.id;
  });
  
  app.passport.deserializeUser(async (ctx, id) => {
    return await ctx.model.User.findOne({ id: id });
  });
};