var mongoose = require('mongoose')
var OrderSchema = require('../schemas/order')
var Order = mongoose.model('order', OrderSchema, 'order');

module.exports = Order;