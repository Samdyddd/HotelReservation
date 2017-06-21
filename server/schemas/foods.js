var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var FoodsSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    price: Number,
    info: String,
    image: String,
    typeName: [{ categoryName: String }]
})

module.exports = FoodsSchema