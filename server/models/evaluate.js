var mongoose = require('mongoose')
var EvaluateSchema = require('../schemas/evaluate')
var Evaluate = mongoose.model('evaluate', EvaluateSchema, 'evaluate');

module.exports = Evaluate;