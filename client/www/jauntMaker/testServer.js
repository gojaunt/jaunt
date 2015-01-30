var express = require('express');
var fs = require('fs');
var url = require('url');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/testScript.js', function (req, res) {
  res.sendFile(__dirname + '/testScript.js');
});

app.get('/getJaunts', function (req, res) {
	fs.readFile('jaunts.txt', 'utf8', function (err, data) {
	  if (err){
	  	throw err;
	  }else{
	  	var dataArr = [];
	  	var index = 0;
	  	var lastIndex;
	  	while(data.indexOf('***END', index) >= 0){
	  		lastIndex = index;
	  		index = data.indexOf('***END', index);
	  		var subData = data.substring(lastIndex, index);
	  		subData = JSON.parse(subData);
	  		dataArr.push(subData);
	  		// there are 18 characters in '***END OF JAUNT***'
	  		index += 18;
	  	}
	  	res.send(dataArr);
	  }
	});
});

app.post('/saveJaunt', function(req, res){
	var body = '';
	req.on('data', function(data){
		body += data;
	});
	req.on('end', function(){
		body += '***END OF JAUNT***';
		fs.appendFile('jaunts.txt',body, function(err){
			if(err){
				console.log(err);
			}else{
				console.log('file written');
			}
		});
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});