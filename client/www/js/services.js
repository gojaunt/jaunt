angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Jaunts', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var geoCoder = new google.maps.Geocoder();

  var jauntFakers = [{
    id: 0,
    name: 'Jaunt 1',
    rating: '4.5 out of 5.0',
    tags: ['Beer', 'Drunk', 'Sights'],
    description: 'Descriptive hipster lorem forage retro lo-fi hashtag food truck Blue Bottle. Organic wolf Pinterest, crucifix trust fund Wes Anderson leggings twee tote bag +1.',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    steps: [
      {
        start_location : {
          coordinates : [-122.4088122, 37.7834319]
        },
        end_location: {
          coordinates : [-122.4085524, 37.7836379]
        }

      },
      {
        start_location : {
          coordinates : [-122.4085524, 37.7836379]
        },
        end_location: {
          coordinates : [-122.4086873, 37.7844507]
        }

      }

    ],
    places: [{
      id: 0,
      name: 'Bar1',
      description: 'A cool bar',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Park1',
      description: 'A cool park',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 2,
      name: 'Restaurant1',
      description: 'A cool restaurant',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }]
  }, {
    id: 1,
    name: 'Jaunt 2',
    rating: '4.5 out of 5.0',
    tags: ['Beer', 'Drunk', 'Sights'],
    description: 'Descriptive hipster lorem forage retro lo-fi hashtag food truck Blue Bottle. Organic wolf Pinterest, crucifix trust fund Wes Anderson leggings twee tote bag +1.',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    steps : [
     {
        start_location : {
          coordinates : [-122.4123220999998, 37.7824969]
        },
        end_location: {
          coordinates : [-122.4124236999998, 37.7830119]
        }

      },
      {
        start_location : {
          coordinates : [-122.4124236999998, 37.7830119]
        },
        end_location: {
          coordinates : [-122.41392000000002, 37.7828141]
        }

      }
      ],
    places: [{
      id: 0,
      name: 'Bar2',
      description: 'A cool bar',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 1,
      name: 'Park2',
      description: 'A cool park',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Restaurant2',
      description: 'A cool restaurant',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }]
  }, {
    id: 2,
    name: 'Jaunt 3',
    rating: '4.5 out of 5.0',
    tags: ['Beer', 'Drunk', 'Sights'],
    description: 'Descriptive hipster lorem forage retro lo-fi hashtag food truck Blue Bottle. Organic wolf Pinterest, crucifix trust fund Wes Anderson leggings twee tote bag +1.',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg',
    steps : [],
    places: [{
      id: 0,
      name: 'Bar3',
      description: 'A cool bar',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
      id: 1,
      name: 'Park3',
      description: 'A cool park',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
      id: 2,
      name: 'Restaurant3',
      description: 'A cool restaurant',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }]
  }];

  var jaunts = jauntFakers;

  return {

    selectJaunts: function(queryObj){
      return $http.get('/api/jaunts', queryObj);
    },
    geoCode: function(loc){
      var deferred = $q.defer();
      geoCoder.geocode({address: loc}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //map.setCenter(results[0].geometry.location);
        console.log(results[0].geometry.location);
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        deferred.resolve([lng, lat]);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
      })
      return deferred.promise;
    },
    // returns all jaunt data.  to be removed
    allJaunts: function() {
      return jaunts = jauntFakers;
    },
    // returns selected Jaunt data
    getJaunt: function(jaunts, jauntId) {
      for (var i = 0; i < jaunts.length; i++) {
        if (jaunts[i]._id === jauntId) {
          return jaunts[i];
        }
      }
      return null;
    },
    // returns selected stop data
    getStop: function(jaunts, jauntId, stopId) {
      var stops = this.getJaunt(jaunts, jauntId).stops;

      for (var i = 0; i < stops.length; i++) {
        if (stops[i]._id === stopId) {
          return stops[i];
        }
      }
      return null;
    },
    getAllPolys : function(jaunts){
      var colors = ['red', 'blue', 'green', 'orange', 'purple']; 
      var polys = [];
      
      for(var i = 0; i< jaunts.length; i++){
        var linePoints = [];
        for(var j = 0; j < jaunts[i].steps.length; j++){
          var startPoint = new google.maps.LatLng(jaunts[i].steps[j].start_location.coordinates[1], jaunts[i].steps[j].start_location.coordinates[0]);
          var endPoint = new google.maps.LatLng(jaunts[i].steps[j].end_location.coordinates[1], jaunts[i].steps[j].end_location.coordinates[0]);
          linePoints.push(startPoint);
          linePoints.push(endPoint);

        }
        var poly = new google.maps.Polyline({strokeColor: colors[i%(colors.length)]});
        poly.setPath(linePoints);
        polys.push(poly);
      }
      return polys;  
    }
  }
});
