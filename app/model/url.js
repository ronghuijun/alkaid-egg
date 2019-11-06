module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        github_url: String,
        github_file: String,
        str: String,
        updated: { type: Date, default: Date.now },

    });
    return mongoose.model('url', schema)
};
