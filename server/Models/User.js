const mongoose = require('mongoose')
// const Schema = new mongoose.Schema;

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // profilePicture: {
    //     type: String,
    //     default: ''
    // },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    // isAdmin:{
    //     type: Boolean,
    //     default: false
    // },

}, {_id: false})

module.exports = mongoose.model('User', UserSchema);