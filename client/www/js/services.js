angular.module('starter.services', [])

// fake jaunt data
.factory('Jaunts', function() {
  var jaunts = [{
    id: 0,
    name: 'A walk in the park',
  }, {
    id: 1,
    name: 'A bar crawl',
  }];


  return {
    all: function() {
      return jaunts;
    },
    get: function(jauntId) {
      // Simple index lookup
      return jaunts[jauntId];
    }
  }
});