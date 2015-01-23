/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
module.exports.options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 


//Determines the mongo db url to connect to depending on the development environment
var env = process.env.NODE_ENV || 'localTest';
if (env === 'production' || env === 'localTest') {
  var mongodbUrl = process.env.MONGOLAB_URI + '/jaunt';
} else {
  var mongodbUrl = 'mongodb://localhost/jaunt';
}

module.exports.url = mongodbUrl;