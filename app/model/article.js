module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        name: { type: String, unique: true, required: true },
        user: { type: String, required: true },
        url: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    });
    return mongoose.model('Article', schema)
};
