angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        // creates an array of map styles
        var styles = [
          {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }
        ];

        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

        var mapOptions = {
          center: new google.maps.LatLng(37.7833, -122.4167),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
        var map = new google.maps.Map($element[0], mapOptions);

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
  
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
});
