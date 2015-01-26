$(function(){
  var points, map, directionService, myOptions;
  var directionsArr = [];


function Init() {
  points = [];
  var mapCanvas = document.getElementById('map-canvas');
  myOptions = {
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
  map = new google.maps.Map(mapCanvas, myOptions);
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionService = new google.maps.DirectionsService();
  
  google.maps.event.addListener(map, "click", function(evt) {
    points.push(evt);
    var infowindow = new google.maps.InfoWindow(), marker, i;
    var latitude = evt.latLng.k;
    var longitude = evt.latLng.D;

    marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
    });
  });
}
// returns an array of objects that have origin and destination keys
var createPointToPoint = function(pointsArr){
  var point2pointArr = [];
  for(var i=0; i<pointsArr.length-1; i++){
    var obj = {index: i,
              origin: pointsArr[i],
              destination: pointsArr[i+1]
            };
    point2pointArr.push(obj);
  }
  return point2pointArr;
};
// returns an array of routes
var createRequestObjArr = function(arr){
  var output = [];
  for(var j=0; j<arr.length; j++){
    var obj = {
      index: j,
      reqObj: {
        origin : arr[j].origin.latLng,
        destination : arr[j].destination.latLng,
        travelMode: google.maps.TravelMode.WALKING
      }
    };
    output.push(obj);
  }
  return output;
};
// call GOOGLE direction services to get directions
var getDirections = function(reqArr){
  for(var k=0; k<reqArr.length; k++){
    var request = reqArr[k].reqObj;
    directionService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          orderReceivedDirections(result);
          // directionsDisplay.setDirections(result);
        }
      });
  }
};

/*receives the directions from GOOGLE and places it in proper order in the directions array*/
var orderReceivedDirections = function(result){
  console.log('I got directions', result);
};
Init();

$('button').click(function(){
  var a = createPointToPoint(points);
  var requestArr = createRequestObjArr(a);
  getDirections(requestArr);
  // console.log(requestArr);
});
});