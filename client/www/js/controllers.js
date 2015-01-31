angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicActionSheet, $timeout, $ionicModal, Jaunts, $q) {

  $scope.initialize = function () {

    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggableCursor:'crosshair',
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false,
      styles: [{"featureType":"poi",
                "elementType": "labels",
                "stylers":[{"visibility":"off"}]},
                {"featureType":"landscape.natural",
                 "elementType":"geometry.fill",
                 "stylers":[{"visibility":"on"},
                            {"color":"#e0efef"}]},
                {"featureType":"poi",
                 "elementType":"geometry.fill",
                 "stylers":[{"visibility":"on"},
                            {"color": "#C5E3BF"}]},
                {"featureType":"road",
                 "elementType":"geometry",
                 "stylers":[{"lightness":100},
                            {"visibility":"simplified"}]},
                {"featureType":"road",
                 "elementType":"geometry.fill",
                 "stylers":[{"color": "#D1D1B8"}]},
                {"featureType":"transit.line",
                 "elementType":"geometry",
                 "stylers":[{"visibility":"on"},
                            {"lightness":700}]},
                {"featureType":"water",
                 "elementType":"all",
                 "stylers":[{"color":"#C6E2FF"}]}]
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $scope.map = map;    
    $scope.mapCreated();

  }

  // google.maps.event.addDomListener(window, 'load', initialize);



  $scope.mapCreated = function() {
    $scope.polys = [];
    $scope.markers = [];
    $scope.infowindows = [];
    $scope.index = 0;

    var crossHairs = new google.maps.MarkerImage('img/crossHair.png',
            // This marker is 128 pixels wide by 128 pixels tall.
            null, 
            // The origin for this image is 0,0.
            new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            new google.maps.Point(64, 64)
        );

    $scope.marker = new google.maps.Marker({
        map: $scope.map,
        icon: crossHairs,
    });
    $scope.marker.bindTo('position', $scope.map, 'center'); 


    google.maps.event.addListener($scope.marker,'click', function (evt) {
      $scope.center = evt.latLng;
      $scope.show(  $scope.index);
    });


    $scope.center = $scope.map.getCenter();
    $scope.centerOnMe()
    .then(function (pos) {
      $scope.center = $scope.map.getCenter();
      $scope.show(0);
    })

  };

  $scope.centerOnMe = function () {
    return $q(function(resolve, reject) {
      if (!$scope.map) {
        reject('No map loaded');
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $ionicLoading.hide();
        resolve(pos);
      }, function (error) {
        reject('Unable to get location: ' + error.message);
      });
    })
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
        range: 1000
      }
    } else if(index === 1){
      query.end_location = {
        coordinates : coordinates,
        range: 1000
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


    if (!$scope.map) {
      $scope.initialize();
    }

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

.controller('HomeCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.jauntTo = function () {
    $state.go('tab.map');
  };

  $scope.jauntFrom = function () {
    $state.go('tab.map');
  }
  $scope.explore = function () {
    $state.go('tab.jaunts');
  }

});
