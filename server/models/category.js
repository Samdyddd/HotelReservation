var mongoose = require('mongoose')
var CategorySchema = require('../schemas/category')
var Category = mongoose.model('category', CategorySchema, 'category');

module.exports = Category;