import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
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
    likes: {
        type: Array,
        default: []
    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;