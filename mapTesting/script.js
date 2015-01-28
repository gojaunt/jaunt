$(function(){

var map, path = new google.maps.MVCArray(),
    service = new google.maps.DirectionsService(), poly;

function Init() {
  var myOptions = {
    zoom: 17,
    center: new google.maps.LatLng(37.7833, -122.4167),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
    },
    disableDoubleClickZoom: true,
    scrollwheel: false,
    draggableCursor: "crosshair"
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  poly = new google.maps.Polyline({ map: map });
  google.maps.event.addListener(map, "click", function(evt) {
    var infowindow = new google.maps.InfoWindow(), marker, i;
    var latitude = evt.latLng.k;
    var longitude = evt.latLng.D;

    marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
        });


    if (path.getLength() === 0) {
      path.push(evt.latLng);
      poly.setPath(path);
    } else {
      service.route({
        origin: path.getAt(path.getLength() - 1),
        destination: evt.latLng,
        travelMode: 'WALKING'
      }, function(result, status) {
        console.log(result);
        if (status == google.maps.DirectionsStatus.OK) {
          for (var i = 0, len = result.routes[0].overview_path.length;
              i < len; i++) {
            path.push(result.routes[0].overview_path[i]);
          }
        }
      });
    }
  });
}


Init();
});




/*
var myWaypoints = [];

function initialize() {
  var mapOptions = {
    zoom: 17,
    center: new google.maps.LatLng(37.7833, -122.4167)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // var myWaypoints = [];
  var myRoutes = [];
  var origin, destination, request, directionsDisplay;

  var jaunt;


  google.maps.event.addListener(map, "click", function (e) {
    var latitude = e.latLng.k;
    var longitude = e.latLng.D;
    
    var directionsService = new google.maps.DirectionsService();
    var infowindow = new google.maps.InfoWindow(), marker, i;

    myWaypoints.push({location:e.latLng});
    var myWaypointLength = myWaypoints.length;

    marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
        });


    
    if(myWaypointLength > 1){
      for(var i=0; i<myWaypoints.length-1; i++){
        origin = myWaypoints[i].location;
        destination = myWaypoints[i+1].location;
        
        request = {
          origin: origin,
          destination: destination,
          travelMode: 'WALKING'
        };


        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            if (jaunt === undefined){
              jaunt = response;
            } else {
              jaunt = jaunt.routes.legs.steps.concat(response.routes.legs.steps);
              console.log(jaunt);
            }
            console.log(response);
            myRoutes.push(response.routes);
            directionsDisplay.setDirections(response);
          }else{
            alert ('failed to get directions');
          }
        });
      }
    }
  });
};

function calculate(){
  var mapOptions = {
    zoom: 17,
    center: new google.maps.LatLng(37.7833, -122.4167)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  var myIndivRoutes = [];
  for(var i=0; i<myWaypoints.length-1; i++){
    origin = myWaypoints[i].location;
    destination = myWaypoints[i+1].location;
    
    request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    myIndivRoutes.push(request);
  }

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = [];
  for(var j=0; j<myIndivRoutes.length; j++){
    
    directionsDisplay.push(new google.maps.DirectionsRenderer());
    directionsDisplay[j].setMap(map);
    directionsService.route(myIndivRoutes[j], function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay[j].setDirections(response);
      }else{
        alert ('failed to get directions');
      }
    });

  }


}

function loadScript() {
  $('button').click(function(){
    calculate();
  });
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(script);

}




window.onload = loadScript;
*/