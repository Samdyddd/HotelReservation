var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var OrderSchema = new Schema({
    userName: String,
    ordertime: {
        type: Date,
        default: Date.now()
    },
    place: String,
    totalPrice: String,
    goods: { type: Array },
    status: {
        type: Number,
        default: 0
    },
    createtime: {
        type: Date,
        default: Date.now()
    }

})

module.exports = OrderSchema