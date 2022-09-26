const mongoose = require('mongoose')
// const Schema = new mongoose.Schema;

const UserSchema = new mongoose.Schema({
    userId: {
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

})

module.exports = mongoose.model('User', UserSchema);