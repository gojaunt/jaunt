var Jaunt = require('./jauntModel.js');
var test = require('./test.js');
var geo = require('../utils/geoUtils.js');
var Q = require('q');

module.exports = {

  fetchJaunts: function (req, res, next) {
	var find = Q.nbind(Jaunt.find, Jaunt);
	var query = req.query;

	if (query.start_location) {
		query.start_location.rangeDegrees = geo.metersToDegrees( query.start_location.range );
	}
	if (query.end_location) {
		query.end_location.rangeDegrees = geo.metersToDegrees( query.end_location.range );
	}


	console.log(query);


	// res.send('queried!');

	find({})
	  .then(function (jaunts) {
	    res.json(jaunts);
	  })
	  .fail(function (error) {
	    next(error);
	  });
  },

  newJaunt: function (req, res, next) {
	var createJaunt = Q.nbind(Jaunt.create, Jaunt);

<<<<<<< HEAD
	var newJaunt = test.jaunt;

	createJaunt(newJaunt)
	  .then(function (createdLink) {
		  res.send("SAVED DER");
	  })
    .fail(function (error) {
      next(error);
    });
=======
	res.send('saved!');
	// var newJaunt = test.jaunt;

	// createJaunt(newJaunt)
	//   .then(function (createdLink) {
	// 	  res.send("SAVED DER");
	//   })
 //    .fail(function (error) {
 //      next(error);
 //    });
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
	
	// var url = req.body.url;
	// console.log(req.body);
	// if (!util.isValidUrl(url)) {
	//   return next(new Error('Not a valid url'));
	// }

	// var createLink = Q.nbind(Link.create, Link);
	// var findLink = Q.nbind(Link.findOne, Link);

	// findLink({url: url})
	//   .then(function (match) {
	//     if (match) {
	//       res.send(match);
	//     } else {
	//       return  util.getUrlTitle(url);
	//     }
	//   })
	//   .then(function (title) {
	//     if (title) {
	//       var newLink = {
	//         url: url,
	//         visits: 0,
	//         base_url: req.headers.origin,
	//         title: title
	//       };
	//       return createLink(newLink);
	//     }
	//   })
	//   .then(function (createdLink) {
	//     if (createdLink) {
	//       res.json(createdLink);
	//     }
	//   })
	//   .fail(function (error) {
	//     next(error);
	//   });
  }

};
