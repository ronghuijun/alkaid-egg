module.exports = app => {
    const mongoose = app.mongoose
    const schema = new mongoose.Schema({
        title: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId },
        detile: { type: String },
        createdAt: { type: Date, default: Date.now }
    })
    return mongoose.model('Article', schema)
}
