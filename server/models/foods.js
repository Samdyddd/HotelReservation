var mongoose = require('mongoose')
var FoodsSchema = require('../schemas/foods')
var Foods = mongoose.model('foods', FoodsSchema, 'foods');

module.exports = Foods;