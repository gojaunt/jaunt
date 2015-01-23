var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jauntDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log('hooray, go mongo');
});

module.exports = mongoose;
