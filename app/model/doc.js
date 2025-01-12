module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        doc_url: String,
        doc_index: String,
        doc_yml: String,
        updated: { type: Date, default: Date.now },

    });
    return mongoose.model('doc', schema)
};
