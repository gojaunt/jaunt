$(function(){
  var points, map, directionService, myOptions;
  var directionsArr = [];
  var markers = [];
  var path;
  var jaunt = {};
  var poly;
  var stopClicked = false;
  var firstDataEntered = false;

  //changes the boolean value of 'stopClicked' to indicate whether button was clicked
  // true means button has been clicked
  $('#stop').click(function(){
    stopClicked = true;
  });
  $('#route').click(function(){
    stopClicked = false;
  });

//sends a post request to save jaunt object
  $('#save').click(function(){

    var title = prompt("What is the name of the Jaunt?");
    var description = prompt("Please add a description.");
    var categories = prompt("Please give some categories.");
    var tags = prompt("please add tags");
    var author = prompt('What\'s your name?');

    jaunt.meta = {
      title : title,
      description : description,
      categories : categories.split(', '),
      author: author,
      votes : 0,
      rating : 5,
      timeTag: ['all day'],
      tags : tags.split(', ')
    };

    jaunt = formatJaunt(jaunt);
    var dataObj = JSON.stringify(jaunt);
    console.log(dataObj);
    // $.post("/saveJaunt", dataObj, function(data){
    //   data = JSON.parse(data);
    // });
  });

  //gets jaunt data from file
  $('#getJaunts').click(function(){
    $.get("/getJaunts", function(data){
      //data comes back as a JSON object.
      console.log(data);
    });
  });

  //create an empty array where jaunt stops can be stored
  jaunt.stops = [];

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
    firstDataEntered = true;
    points.shift();
    points.push(evt);

    var infowindow = new google.maps.InfoWindow(), i;
    var latitude = evt.latLng.k;
    var longitude = evt.latLng.D;

    var marker = createMarker(latitude, longitude);
    if(markers.length === 0){
      marker.isStartLocation = true;
    }
    markers.push(marker);
    deleteNonStopMarkers(markers);

    
    if(points[0] !== undefined){
      // console.log(points);  
      var reqObj = createRequestObj(points);
      getDirections(reqObj);
    }

    if(stopClicked){
      //prompt the user for input
      var name = prompt("What is the name of the stop?");
      var description = prompt("Please add a description.");
      var photoURL = prompt("Please add a photoURL.");
      var tags = prompt("please add tags");
      var duration = prompt('How long did you stay there?');
      var stopLocObj = {
        coordinates: [longitude, latitude]
      };
      
      //save the input in the jaunt object
      var stopObj = {
        name: name,
        description: description,
        photoURL: photoURL,
        tags: tags,
        duration: duration,
        location: stopLocObj
      };
      jaunt.stops.push(stopObj);
      console.log(jaunt);
    }
  });
}

//creates markers on the map
var createMarker = function(latitude, longitude) {
  var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
        });
  if(stopClicked){
    marker.isAStop = true;
  }else{
    marker.isAStop = false;
  }
  return marker;
}

//deletes marker that has a 'isAStop' property of 'false'
var deleteNonStopMarkers = function(arr) {
  var lastMarker = arr[arr.length-2];
  if(arr.length > 2 && !lastMarker.isAStop){
    lastMarker.setMap(null);
  }
}
// returns a request object that can be used by google maps api
var createRequestObj = function(arr){
  var reqObj = {
    origin : arr[0].latLng,
    destination : arr[1].latLng,
    travelMode: google.maps.TravelMode.WALKING
  }
  return reqObj;
};

var buildPath = function(result){
  var stepper = result.routes[0].legs[0].steps;
  if(jaunt.start_location === undefined){
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
    newStep.duration.text = stepper[i].duration.text;
    newStep.duration.value = stepper[i].duration.value;
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

  // console.log('jaunt is ', jaunt);
  displayRoute();
};

var displayRoute = function(){
  var linepoints = [];
  for (var i = 0; i < jaunt.steps.length; i++){
    linepoints.push(new google.maps.LatLng(jaunt.steps[i].start_location.lat, jaunt.steps[i].start_location.lng));
    linepoints.push(new google.maps.LatLng(jaunt.steps[i].end_location.lat, jaunt.steps[i].end_location.lng));
  }
  // console.log("linepoints is ",linepoints);
  poly.setPath(linepoints);
}

var getDirections = function(reqObj){
  directionService.route(reqObj, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        buildPath(result);
      }
    });
};

var formatJaunt = function (newJaunt) {

  newJaunt.distance = {
    text : '',
    value : 0
  };
  newJaunt.duration = {
    text : '',
    value : 0
  };

  //Reformat the start and end location of the jaunt
  newJaunt.start_location = {
    coordinates: [newJaunt.start_location.lng, newJaunt.start_location.lat]
  };
  newJaunt.end_location = {
    coordinates: [newJaunt.end_location.lng, newJaunt.end_location.lat]
  };


  // Create the bounds of the Jaunt
  var initBounds = {northeast: [newJaunt.steps[0].start_location.lng, newJaunt.steps[0].start_location.lat],
                    southwest: [newJaunt.steps[0].start_location.lng, newJaunt.steps[0].start_location.lat]};

  newJaunt.bounds = newJaunt.steps.reduce(function (bounds, step) {
    if (step.start_location.lng >= bounds.northeast[0]) {
      bounds.northeast[0]= step.start_location.lng;
    }
    if (step.start_location.lat >= bounds.northeast[1]) {
      bounds.northeast[1]= step.start_location.lat;
    }
    if (step.start_location.lng <= bounds.southwest[0]) {
      bounds.southwest[0]= step.start_location.lng;
    }
    if (step.start_location.lat <= bounds.southwest[1]) {
      bounds.southwest[1]= step.start_location.lat;
    }
    return bounds;
  }, initBounds);

  // Reformat the step latitude and longitude data to fit the geoJSON format, and accumulate the duration and distance
  // Recalculate the duration on wrongly constructed jaunts to be a time (based on .67 m/s walking rate)
  // TODO : CONVERT TO HUMAN READABLE FORMATS IN ALL INSTANCES
  for (var i = 0; i < newJaunt.steps.length; i++) {
    if (newJaunt.steps[i].distance.text === newJaunt.steps[i].duration.text) {
      newJaunt.steps[i].duration.value = newJaunt.steps[i].distance.value * 0.67;
      newJaunt.steps[i].duration.text = '';
    }
    newJaunt.distance.value += newJaunt.steps[i].distance.value;
    newJaunt.duration.value += newJaunt.steps[i].duration.value;


    var start_location = {};
    var end_location = {};
    start_location.coordinates = [newJaunt.steps[i].start_location.lng, newJaunt.steps[i].start_location.lat];
    end_location.coordinates = [newJaunt.steps[i].end_location.lng, newJaunt.steps[i].end_location.lat];

    newJaunt.steps[i].start_location = start_location;
    newJaunt.steps[i].end_location = end_location;
  }

  // Reformat the stop latitude and longitude data to fit the geoJSON format, and accumulate the duration
  // Reformat the tags string to an array format, if necessary
  // TODO : CONVERT TO HUMAN READABLE FORMATS IN ALL INSTANCES
  for (var i = 0; i < newJaunt.stops.length; i++) {
    newJaunt.stops[i].duration = {
      text : '',
      value : newJaunt.stops[i].duration * 1
    };
    newJaunt.duration.value += newJaunt.stops[i].duration.value;

    if (!Array.isArray(newJaunt.stops[i].tags)) {
      newJaunt.stops[i].tags = newJaunt.stops[i].tags.split(', ');
    }
    newJaunt.meta.tags = newJaunt.meta.tags.concat(newJaunt.stops[i].tags);
  }

  return newJaunt;
}

Init();

});