angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Jaunts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var jaunts = [{
    id: 0,
    name: 'Jaunt 1',
    rating: '4.5 out of 5.0',
    tags: ['Beer', 'Drunk', 'Sights'],
    description: 'Descriptive hipster lorem forage retro lo-fi hashtag food truck Blue Bottle. Organic wolf Pinterest, crucifix trust fund Wes Anderson leggings twee tote bag +1.',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
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

  return {
    // returns all jaunt data
    allJaunts: function() {
      return jaunts;
    },
    // returns selected jaunt data
    getJaunt: function(jauntId) {
      for (var i = 0; i < jaunts.length; i++) {
        if (jaunts[i].id === parseInt(jauntId)) {
          return jaunts[i];
        }
      }
      return null;
    },
    // returns selected jaunt tags data
    allTags: function(jaunt) {
      return jaunt.tags;
    },
    // returns selected jaunt places data
    allPlaces: function(jaunt) {
      return jaunt.places;
    },
    // returns selected place data
    getPlace: function(jauntId, placeId) {
      var places = this.getJaunt(jauntId).places;
      
      for (var i = 0; i < places.length; i++) {
        if (places[i].id === parseInt(placeId)) {
          return places[i];
        }
      }
      return null;
    }
  }
});
