module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        github_url: String,
        github_file: String,
        str: String,
        str_type: String,
        updated: { type: Date, default: Date.now },

    });
    return mongoose.model('Url', schema)
};
