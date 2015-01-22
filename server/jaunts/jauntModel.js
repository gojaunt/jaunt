var mongoose = require('mongoose');

var JauntSchema = new mongoose.Schema({
 title: String,
 rating: Number
});


JauntSchema.pre('save', function(next){
  next();
});

module.exports = mongoose.model('Jaunt', JauntSchema);
