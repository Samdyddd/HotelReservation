var mongoose = require('mongoose')
var HotelSchema = require('../schemas/hotel')
var Hotel = mongoose.model('hotel', HotelSchema, 'hotel');

module.exports = Hotel;