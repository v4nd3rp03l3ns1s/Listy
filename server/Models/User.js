const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 5,
        max: 25,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 7
    },
    profilePicture:{
        type: String,
        default: ''
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 100
    }
},
//whenever you create a user or update it, its gonna automatically update our timestamps
{timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);

