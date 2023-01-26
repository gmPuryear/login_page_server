const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true // do not want anyone else to have the same email
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now // this will set the time automatically for the date and time
    }
});

module.exports = User = mongoose.model('user', UserSchema); // 'user' is model name