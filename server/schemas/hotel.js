var mongoose = require('mongoose');

var HotelSchema = new mongoose.Schema({
    hotelName: {
        unique: true,
        type: String
    },
    info: {
        type: String
    },
    image: String
});

module.exports = HotelSchema