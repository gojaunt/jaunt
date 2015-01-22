// Update API keys prior to deployment
var yelp = require("../index").createClient({
  consumer_key: "ADD KEY", 
  consumer_secret: "ADD SECRET",
  token: "ADD TOKEN",
  token_secret: "ADD TOKEN SECRET"
});

/* 

// @see http://www.yelp.com/developers/documentation/v2/search_api

Query example:

location: "San Francisco" OR ll: "37.788022, -122.399797"
// location and ll ("latitude and longitute") conflict if in same query

category_filter: "dog_parks" OR term: "food"
// category and term conflict if in same query.  Term is a general search query.

radius_filter: "1609.34"
// 1 mile = 1609.34 meters.  Max radius is 25 miles or 40000 meters.

limit: "10"
// number of business results to return.  Default is 20. 

*/

yelp.search({category_filter: "dog_parks", ll: "37.788022, -122.399797", radius_filter: "1609.34", limit: "5"}, function(error, data) {
  console.log(error);
  console.log(data.businesses[0].location); // businesses returns array of business objects
});

