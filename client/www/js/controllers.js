angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicActionSheet, $timeout, $ionicModal, Jaunts) {

  $scope.mapCreated = function(map) {
    $scope.map = map;

    $scope.polys = [];
    $scope.markers = [];
    $scope.infowindows = [];
    $scope.index = 0;

    $scope.marker = new google.maps.Marker({
        map: map,
        icon: 'img/cross-hairs.gif',
    });
    $scope.marker.bindTo('position', map, 'center'); 


    google.maps.event.addListener($scope.marker,'click', function (evt) {
      $scope.center = evt.latLng;
      console.log("yeah center", $scope.center);
      $scope.show($scope.index);

    });


    $scope.center = map.getCenter();
    //$scope.centerOnMe();
    //then call show(near);
    $scope.show(0);
    //$scope.displayJaunts($scope.jaunts);
  };

  // $scope.displayJaunts = function(jaunts) {
  //   var infowindow = new google.maps.InfoWindow();

  //   var marker, i;

  //   for (i = 0; i < jaunts.length; i++) {
  //     marker = new google.maps.Marker({
  //       position: new google.maps.LatLng(jaunts[i].location[0], jaunts[i].location[1]),
  //       map: $scope.map
  //     });

  //     // opens clickable infowindow on hover
  //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
  //       return function() {
  //         var contentString = 
  //               '<a class="infoWindow" href="#/tab/jaunts/' + jaunts[i].id + '"><div>' + jaunts[i].name + ': ' + jaunts[i].rating
  //              +'</div></a>';

  //         infowindow.setContent(contentString);
  //         infowindow.open($scope.map, marker);
  //       }
  //     })(marker, i));

  //   }

  // };

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
        $scope.index = index;
        $scope.show($scope.index);
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
    var query = {};
    var coordinates = [$scope.center.lng(), $scope.center.lat()];
    removeFromMap($scope.polys);
    removeFromMap($scope.markers);

    //if statement sets up the query.
    if(index === 0){
      query.start_location = {
        coordinates: coordinates,
        range: 1500
      }
    } else if(index === 1){
      query.end_location = {
        coordinates : coordinates,
        range: 1500
      }
    } else if(index === 2){
      console.log('do some stuff for choice 3');
    }

    //the db call
    Jaunts.selectJaunts(query).then(function(data){
      $scope.jaunts = data.data;
      console.log('scope jaunts', $scope.jaunts);
      $scope.polys = Jaunts.getAllPolys($scope.jaunts);

      addToMap($scope.polys);
      displayMeta();
      
    });
  };

  var displayMeta = function(){
    for(var i = 0; i < $scope.infowindows.length; i++){
      $scope.infowindows[i].close();
    }
    $scope.markers = [];
    for(var i = 0; i < $scope.jaunts.length; i++){

      var contentString = '<div class="infoW">'+
            $scope.jaunts[i].meta.title +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        $scope.markers.push(new google.maps.Marker({
            position: new google.maps.LatLng($scope.jaunts[i].start_location.coordinates[1],$scope.jaunts[i].start_location.coordinates[0]),
            map: $scope.map,
            title: $scope.jaunts[i].meta.title
        }));
        infowindow.open($scope.map,$scope.markers[i]);
        $scope.infowindows.push(infowindow);
    }
  }

  // var showPins = function(jaunts){
  //   console.log('jaunts in showPins is', jaunts);
  //   $scope.markers = []
  //   for(var i = 0; i < jaunts.length; i++){
  //     for(var j = 0; j < jaunts[i].stops.length; j++){
  //       $scope.markers.push(new google.maps.Marker({
  //       position: new google.maps.LatLng(jaunts[i].stops[j].location.coordinates[1], jaunts[i].stops[j].location.coordinates[0]),
  //       map: $scope.map
  //     }));
  //     }
      
  //   }
  // }

  // var deletePins = function(){
  //   removeFromMap($scope.markers);
  //   $scope.markers = [];
  // }

  var addToMap = function(items){
    for(var i = 0; i < items.length; i++){
      items[i].setMap($scope.map);
      addInfoWindowToMap(items[i]);
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
      infowindow.setContent('<a><div>' + $scope.jaunts[0].title + '</div></a>');
      infowindow.setPosition(e.latLng);
      infowindow.open($scope.map);
    });
  }


  // add modal for filtering
  $ionicModal.fromTemplateUrl('templates/filter.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


})

.controller('JauntsCtrl', function($scope, Jaunts) {
  
  // empty obj as query since query not set up yet
  Jaunts.selectJaunts({}).then(function(data){
    $scope.jaunts = data.data;
  });
})

.controller('JauntDetailCtrl', function($scope, $stateParams, Jaunts) {
  // need to refactor.  code used in JauntsCtrl and PlaceDetailCtrl as well.  Central location for jaunts query?
  // empty obj as query since query not set up yet
  Jaunts.selectJaunts({}).then(function(data){
    $scope.jaunts = data.data;

    $scope.jaunt = Jaunts.getJaunt($scope.jaunts, $stateParams.jauntId);
  });
})

.controller('PlaceDetailCtrl', function($scope, $stateParams, Jaunts) {
  // need to refactor.  code used in JauntsCtrl and JauntDetailCtrl as well.  Central location for jaunts query?
  // empty obj as query since query not set up yet
  Jaunts.selectJaunts({}).then(function(data){
    $scope.jaunts = data.data;

    $scope.stop = Jaunts.getStop($scope.jaunts, $stateParams.jauntId, $stateParams.placeId);
  });
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
