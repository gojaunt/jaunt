var mongoose = require('mongoose');

var JauntSchema = new mongoose.Schema({
 title: String,
 rating: Number
});



module.exports = mongoose.model('Jaunt', JauntSchema);
