var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var EvaluateSchema = new Schema({
    Username: String,
    content: String,
    foodreviews: {
        type: Number,
        default: 1
    },
    servicereviews: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 0
    },
    time: {
        type: Date,
        default: Date.now()
    },
    orderId: [{ type: ObjectId, ref: 'order' }]
})

module.exports = EvaluateSchema