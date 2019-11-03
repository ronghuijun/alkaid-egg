module.exports = app => {
  const mongoose = app.mongoose;
  const schema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  return mongoose.model('User', schema)
};
