angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicPopover, $ionicActionSheet, $timeout, Jaunts) {
  $scope.mapCreated = function(map) {
    $scope.map = map;

    $scope.polys = [];

    //$scope.centerOnMe();
    //then call show(near);
    $scope.show(0);

    // display jaunts near me on map creation
    $scope.displayJaunts($scope.jaunts);
  };

  // this jaunt data and jaunt data in jaunts needs to be synced
  $scope.jaunts = Jaunts.allJaunts();

  // creates markers and infowindows on google map
  $scope.displayJaunts = function(jaunts) {
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < jaunts.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(jaunts[i].location[0], jaunts[i].location[1]),
        map: $scope.map
      });

      // opens clickable infowindow on hover
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          var contentString = 
                '<a class="infoWindow" href="#/tab/jaunts/' + jaunts[i].id + '"><div>' + jaunts[i].name + ': ' + jaunts[i].rating
                +'</div></a>';

          infowindow.setContent(contentString);
          infowindow.open($scope.map, marker);
        }
      })(marker, i));

    }
  };

  /*// find my location functionality not in use
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
  };*/

  //////////////////// Simple Search ////////////////////

  $scope.search = 'jaunts near me!';

  // adds Action Sheet for simple search  
  $scope.showSearch = function() {

    // Show action sheet
    var hideSearch = $ionicActionSheet.show({
      buttons: [
        {text: 'jaunts near me!'},
        {text: 'option 2!'},
        {text: 'option 3!'}
      ],
      titleText: "<b>What do you fancy?<b>",
      buttonClicked: function(index, choice) {
        $scope.search = choice.text;
        console.log("index is ", index, "and choice is", choice);
        $scope.show(index);
        return true;
      }
    });


    // Hide sheet after three seconds
    $timeout(function() {
      hideSearch();
    }, 3000);
  };

  //calls Jaunts.getAllPolys to receive an array of polylines; loops through to attach to map
  $scope.show = function(index){
    if(index === 0){
      $scope.polys = Jaunts.getAllPolys();
      addToMap($scope.polys);
    } else if(index === 1){
      console.log('do some stuff for 2');
      removeFromMap($scope.polys);
      $scope.polys = [];
    } else if(index === 2){
      console.log('do some stuff for choice 3');
      removeFromMap($scope.polys);
      $scope.polys = [];
    }
  };

  var addToMap = function(polys){
    for(var i = 0; i < polys.length; i++){
      polys[i].setMap($scope.map);
    }
  };

  var removeFromMap = function(polys){
    for(var i = 0; i < polys.length; i++){
      polys[i].setMap(null);
    }
  };

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
