module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        base_url: String,
        github_utl: String,
        index_page: String,
        index_type :String,
        // releases_num: Number,
        doc_yml: String,
        doc_index: String,
        updated: { type: Date, default: Date.now },
    });
    return mongoose.model('Github', schema)
};
