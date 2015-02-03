angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicActionSheet, $timeout, $ionicModal, Jaunts, $q, $rootScope) {

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

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);  

    $scope.polys = [];
    $scope.markers = [];
    $scope.infowindows = [];
    $scope.index = 0;

    $scope.centerOnMe()
    .then(function (pos) {
      $scope.center = $scope.map.getCenter();
      $scope.show($scope.index);
    })

  };

  $scope.clickCrosshairs = function (){
    $scope.center = $scope.map.getCenter();
    $scope.show(  $scope.index);
  }

  $scope.centerOnMe = function () {
    return $q(function(resolve, reject) {
      if (!$scope.map) {
        reject('No map loaded');
      }

      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i><div>Getting Location</div>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200
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
  
  /*// adjust from global scope? Popover for new users?
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
  };*/


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
    }

    //the db call

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i><div>Finding Jaunts</div>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
    });


    hideMarkers();

    Jaunts.selectJaunts(query).then(function(data){
      setTimeout( $ionicLoading.hide, 500);

      $scope.jaunts = data.data;
      //places on rootscope to persist across controllers
      $rootScope.jaunts = data.data;
      $scope.polys = Jaunts.getAllPolys($scope.jaunts);

      addToMap($scope.polys);
      showMarkers();
      
    });
  };


  var hideMarkers = function(){
    for(var i = 0; i < $scope.infowindows.length; i++){
      $scope.infowindows[i].close();
      $scope.markers[i].setMap(null);
    }
    $scope.markers.length = 0;
    $scope.infowindows.length = 0;
  }

  var showMarkers = function(){

    for(var i = 0; i < $scope.jaunts.length; i++){
      var contentString = '<div class="infoW">'+
            '<a href="/#/tab/jaunts/' +
            $scope.jaunts[i]._id +
            '">' +
            '<h5 class="title">' +
            $scope.jaunts[i].meta.title +
            '</h5>' +
            '<img src="/img/' + 
            Math.round($scope.jaunts[i].meta.rating) + 
            '.png" class="rating"' + 
            '>' +
            '<small> via ' +
            $scope.jaunts[i].meta.votes +
            ' votes</small>' +
            '</a>' +
            '</div>' /* closes infoW container*/;

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.jaunts[i].start_location.coordinates[1],$scope.jaunts[i].start_location.coordinates[0]),
            map: $scope.map,
            title: $scope.jaunts[i].meta.title
        });
        $scope.markers.push(marker);
        $scope.infowindows.push(infowindow);

        infowindow.open($scope.map, marker);
    }
  }

  var addToMap = function(items){
    for(var i = 0; i < items.length; i++){
      items[i].setMap($scope.map);
    }
  };

  var removeFromMap = function(items){
    for(var i = 0; i < items.length; i++){
      items[i].setMap(null);
    }
  };

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

.controller('JauntsCtrl', function($scope, Jaunts, $ionicModal, $rootScope) {


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

.controller('JauntDetailCtrl', function($scope, $stateParams, Jaunts, $rootScope) {

  $scope.jaunt = Jaunts.getJaunt($rootScope.jaunts, $stateParams.jauntId);
})

.controller('PlaceDetailCtrl', function($scope, $stateParams, Jaunts, $rootScope) {

  $scope.stop = Jaunts.getStop($rootScope.jaunts, $stateParams.jauntId, $stateParams.placeId);
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
