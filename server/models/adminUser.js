var mongoose = require('mongoose')
var AdminUserSchema = require('../schemas/adminUser')
var AdminUser = mongoose.model('adminuser', AdminUserSchema, 'adminuser');

module.exports = AdminUser;