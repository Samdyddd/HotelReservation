var mongoose = require('mongoose')
var Schema = mongoose.Schema
    // var ObjectId = Schema.Types.ObjectId

var CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    type: {
        type: Number,
        default: 0
    }
})

module.exports = CategorySchema