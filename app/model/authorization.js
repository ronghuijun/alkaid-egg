module.exports = app => {
    const mongoose = app.mongoose
    const AuthorizationSchema = new mongoose.Schema({
      uid: { type: String, required: true },
      provider:{ type: String},
      user_id: { type: String, required: true }
    })
    return mongoose.model('Authorization', AuthorizationSchema)
  }
  