var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
	autoIncrement.initialize(mongoose.connection);

var BoardSchema = new Schema({
    title: String,
    position: String,
    content: String,
    create_time: {type: Date, default: Date.now()},
});

BoardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'bid',
    startAt: 1000,
    incrementBy: 1
});

module.exports = mongoose.model('Board', BoardSchema);