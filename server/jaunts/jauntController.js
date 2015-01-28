var Jaunt = require('./jauntModel.js');
var test = require('./test.js');
var query = require('../utils/queryUtils.js');
var Q = require('q');

module.exports = {

  fetchJaunts: function (req, res, next) {
	var find = Q.nbind(Jaunt.find, Jaunt);

	var dbQuery = query.dbQuery(req.query);


	find(dbQuery)
	  .then(function (jaunts) {
	    res.json(jaunts);
	  })
	  .fail(function (error) {
	    next(error);
	  });
  },

  newJaunt: function (req, res, next) {
	var createJaunt = Q.nbind(Jaunt.create, Jaunt);

	var newJaunt = test.jaunt;

	createJaunt(newJaunt)
	  .then(function (createdLink) {
		  res.send("SAVED DER");
	  })
    .fail(function (error) {
      next(error);
    });
	
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
