const mongoose = require('mongoose')
// const Schema = new mongoose.Schema;

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
}, { _id: false })

module.exports = mongoose.model('User', UserSchema);