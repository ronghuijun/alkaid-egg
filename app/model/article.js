module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        baseUrl: {type: String, required: true},
        blogUrl: {type: String, required: true},
        readNum:  {type: Number, required: true,default:0},
        readTime:  {type: Number, required: true,default: 0},
        commentNum:  {type: Number, required: true,default: 0},
        createdAt: { type: Date, default: Date.now }
    });
    return mongoose.model('Article', schema)
};
