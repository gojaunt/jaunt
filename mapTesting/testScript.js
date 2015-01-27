$(function(){
  var points, map, directionService, myOptions;
  var directionsArr = [];
  var path;
  var jaunt;
  var poly;


function Init() {
  points = [undefined, undefined];
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
  poly = new google.maps.Polyline({ map: map });
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionService = new google.maps.DirectionsService();
  
  google.maps.event.addListener(map, "click", function(evt) {
    points.shift();
    points.push(evt);

    var infowindow = new google.maps.InfoWindow(), marker, i;
    var latitude = evt.latLng.k;
    var longitude = evt.latLng.D;

    marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
    });
    if(points[0] !== undefined){
      console.log(points);  
      var p2p = createPointToPoint(points);
      var req = createRequestObjArr(p2p);
      getDirections(req);
    }
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
          buildPath(result);
          
        }
      });
  }
};



var buildPath = function(result){
  console.log(result);
  var stepper = result.routes[0].legs[0].steps;
  if(jaunt === undefined){
    jaunt = {};
    jaunt.start_location = {};
    jaunt.start_location.lat = stepper[0].start_location.lat();
    jaunt.start_location.lng = stepper[0].start_location.lng();
    jaunt.steps = [];
    jaunt.end_location = {};
  } 
    
  for(var i = 0; i < stepper.length; i++){
    var newStep = {};
    newStep.distance = {};
    newStep.distance.text = stepper[i].distance.text;
    newStep.distance.value = stepper[i].distance.value;
    newStep.duration = {};
    newStep.duration.text = stepper[i].distance.text;
    newStep.duration.value = stepper[i].distance.value;
    newStep.end_location = {};
    newStep.end_location.lat = stepper[i].end_location.lat();
    newStep.end_location.lng = stepper[i].end_location.lng();
    newStep.html_instructions = stepper[i].instructions;
    newStep.maneuver = stepper[i].maneuver;
    newStep.start_location = {};
    newStep.start_location.lat = stepper[i].start_location.lat();
    newStep.start_location.lng = stepper[i].start_location.lng();
    //console.log(newStep);
    jaunt.steps.push(newStep);
  }
  
  jaunt.end_location.lat = stepper[stepper.length-1].end_location.lat();
  jaunt.end_location.lng = stepper[stepper.length-1].end_location.lng();

  console.log('jaunt is ', jaunt);
  displayRoute();
};

var displayRoute = function(){
  var linepoints = [];
  for (var i = 0; i < jaunt.steps.length; i++){
    linepoints.push(new google.maps.LatLng(jaunt.steps[i].start_location.lat, jaunt.steps[i].start_location.lng));
    linepoints.push(new google.maps.LatLng(jaunt.steps[i].end_location.lat, jaunt.steps[i].end_location.lng));
  }
  console.log("linepoints is ",linepoints);
  poly.setPath(linepoints);
}

Init();

$('button').click(function(){
  var a = createPointToPoint(points);
  var requestArr = createRequestObjArr(a);
  getDirections(requestArr);
  // console.log(requestArr);
});
});