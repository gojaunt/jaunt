angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicActionSheet, $timeout, Jaunts) {



  $scope.mapCreated = function(map) {
    $scope.map = map;

    $scope.polys = [];
    $scope.markers = [];

    $scope.marker = new google.maps.Marker({
        map: map,
        icon: 'img/cross-hairs.gif',
    });
    $scope.marker.bindTo('position', map, 'center'); 


    google.maps.event.addListener($scope.marker,'click', function (evt) {
      console.log("yeah center");
      $scope.center = evt.LatLng;
    });


    //$scope.centerOnMe();
    //then call show(near);
    $scope.show(0);
    //Jaunts.selectJaunts('lalala');
    $scope.displayJaunts($scope.jaunts);
  };

  $scope.displayJaunts = function(jaunts) {
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < jaunts.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(jaunts[i].location[0], jaunts[i].location[1]),
        map: $scope.map
      });

      // opens clickable infowindow on hover
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
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
  
  // adjust from global scope? Popover for new users?
  $scope.search = 'jaunts near me!';

  // adds Action Sheet for simple search  
  $scope.showSearch = function() {

    // Show action sheet
    var hideSearch = $ionicActionSheet.show({
      buttons: [
        {text: 'jaunts near me!'},
        {text: 'jaunts to a location!'},
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
      removeFromMap($scope.polys);
      deletePins();

      $scope.jaunts = Jaunts.allJaunts();
      $scope.polys = Jaunts.getAllPolys($scope.jaunts);
      addToMap($scope.polys);
    } else if(index === 1){
      console.log('do some stuff for 2');
      removeFromMap($scope.polys);
      var dest = prompt('Where do you want to go?');
      var coords = Jaunts.geoCode(dest);
      coords.then(function(data){
        coords = data;
        console.log('this promise is resolving');
        var query = {
          end_location : {
            coordinates : coords,
            range : 1500
          }
        }
        $scope.map.setCenter(new google.maps.LatLng(coords[1], coords[0]));

        console.log(query);
        Jaunts.selectJaunts(query).then(function(data){
          $scope.jaunts = data.data;
          //console.log('scope jaunts', $scope.jaunts);
          $scope.polys = Jaunts.getAllPolys($scope.jaunts);
          showPins($scope.jaunts);

          addToMap($scope.polys);
          
        });
      });
    } else if(index === 2){
      console.log('do some stuff for choice 3');
      removeFromMap($scope.polys);
      $scope.polys = [];
    }
  };

  $scope.displayJaunts = function(){

  };

  var showPins = function(jaunts){
    console.log('jaunts in showPins is', jaunts);
    $scope.markers = []
    for(var i = 0; i < jaunts.length; i++){
      for(var j = 0; j < jaunts[i].stops.length; j++){
        $scope.markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(jaunts[i].stops[j].location.coordinates[1], jaunts[i].stops[j].location.coordinates[0]),
        map: $scope.map
      }));
      }
      
    }
  }

  var deletePins = function(){
    removeFromMap($scope.markers);
    $scope.markers = [];
  }

  var addToMap = function(polys){
    for(var i = 0; i < polys.length; i++){
      polys[i].setMap($scope.map);
      addInfoWindowToMap(polys[i]);
    }
  };

  var removeFromMap = function(items){
    for(var i = 0; i < items.length; i++){
      items[i].setMap(null);
    }
  };
  //sets info window when jaunt added to map.  NOTE: need jaunt meta data to be passed in getAllPolys for this to work
  var addInfoWindowToMap = function(polys){
    var infowindow = new google.maps.InfoWindow({
      map: $scope.map
    });

    google.maps.event.addListener(polys, 'click', function(e) {
      infowindow.setContent('<a><div>leads to jaunt detail</div></a>');
      infowindow.setPosition(e.latLng);
      infowindow.open($scope.map);
    });
  }


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
})

.controller('HomeCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
