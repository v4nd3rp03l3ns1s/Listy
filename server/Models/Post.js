const mongoose = require('mongoose')
// const Schema = new mongoose.Schema;

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    authorId: {
        type: String,
        required: true
    }

})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;