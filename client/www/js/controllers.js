angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicPopover) {
  $scope.mapCreated = function(map) {
    $scope.map = map;

    // note: created a dummy point that on click will show popover of jaunt
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(37.7833, -122.4167),
      map: $scope.map
    });
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  // adds popover functionality to map.  Need to connect to map listener
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  /*$scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });*/
})

.controller('JauntsCtrl', function($scope, Jaunts) {
  $scope.jaunts = Jaunts.allJaunts();
})

.controller('JauntDetailCtrl', function($scope, $stateParams, Jaunts) {
  $scope.jaunt = Jaunts.getJaunt($stateParams.jauntId);
  $scope.places = Jaunts.allPlaces($scope.jaunt);
  $scope.tags = Jaunts.allTags($scope.jaunt);
})

.controller('PlaceDetailCtrl', function($scope, $stateParams, Jaunts) {
  $scope.place = Jaunts.getPlace($stateParams.jauntId, $stateParams.placeId)
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
