var mongoose = require('mongoose');

var AdminUserSchema = new mongoose.Schema({
    userName: {
        unique: true,
        type: String
    },
    password: {
        type: String
    }
});

module.exports = AdminUserSchema