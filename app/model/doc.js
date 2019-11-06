module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        doc_url: String,
        doc_index: String,
        doc_yml: String,
        
    });
    return mongoose.model('User', schema)
};
