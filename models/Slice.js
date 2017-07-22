var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
	autoIncrement.initialize(mongoose.connection);

var SliceSchema = new Schema({
    isValuable: Boolean,
    img: String,
    create_time: {type: Date, default: Date.now()},
});

SliceSchema.plugin(autoIncrement.plugin, {
    model: 'Slice',
    field: 'sid',
    startAt: 1000,
    incrementBy: 1
});

module.exports = mongoose.model('Slice', SliceSchema);