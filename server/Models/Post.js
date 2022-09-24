const mongoose = require('mongoose')
// const Schema = new mongoose.Schema;

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    rating: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    }

})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;