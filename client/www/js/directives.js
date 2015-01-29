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

        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});


        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });

      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})

