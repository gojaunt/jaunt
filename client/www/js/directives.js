angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(37.7833, -122.4167),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false,
          styles: [ {"featureType":"landscape.natural",
                     "elementType":"geometry.fill",
                     "stylers":[{"visibility":"on"},
                                {"color":"#e0efef"}]},
                    {"featureType":"poi",
                     "elementType":"geometry.fill",
                     "stylers":[{"visibility":"on"},
                                {"hue":"#1900ff"},
                                {"color":"#c0e8e8"}]},
                    {"featureType":"road",
                     "elementType":"geometry",
                     "stylers":[{"lightness":100},
                                {"visibility":"simplified"}]},
                    {"featureType":"road",
                     "elementType":"labels",
                     "stylers":[{"visibility":"off"}]},
                    {"featureType":"transit.line",
                     "elementType":"geometry",
                     "stylers":[{"visibility":"on"},
                                {"lightness":700}]},
                    {"featureType":"water",
                     "elementType":"all",
                     "stylers":[{"color":"#7dcdcd"}]}]
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });

        // Runs popover function on mouseover.  Better way to consolidate this functionality and popover?
        google.maps.event.addDomListener(marker, 'mouseover', function(e) {
          console.log('Pop up jaunt detail');
        })
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})

