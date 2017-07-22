var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
	autoIncrement.initialize(mongoose.connection);

var PictureSchema = new Schema({
    title: String,
    desc: String,
    img: String,
    create_time: {type: Date, default: Date.now()},
});

PictureSchema.plugin(autoIncrement.plugin, {
    model: 'Picture',
    field: 'pid',
    startAt: 1000,
    incrementBy: 1
});

module.exports = mongoose.model('Picture', PictureSchema);