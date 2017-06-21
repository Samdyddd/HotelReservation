var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userName: {
        unique: true,
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        unique: true,
        type: String
    }
});

module.exports = UserSchema