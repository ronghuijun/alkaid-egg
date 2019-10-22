module.exports = app => {
    const mongoose = app.mongoose
    const schema = new mongoose.Schema({
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
        detile: { type: String },
        createdAt: { type: Date, default: Date.now }
    })
    return mongoose.model('Comments', schema)
}
