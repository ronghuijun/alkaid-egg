module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        base_url: String,
        github_utl: String,
        index_page: String,
        releases_num: Number,
        has_doc: Boolean,
        updated: { type: Date, default: Date.now },
    });
    return mongoose.model('User', schema)
};
