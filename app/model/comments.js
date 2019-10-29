module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        owner: {type: String, required: true},
        baseUrl: {type: String, required: true},
        blogUrl: {type: String, required: true},
        detile: {type: String, required: true},
        createdAt: {type: Date, default: Date.now}
    });
    return mongoose.model('Comments', schema)
};
