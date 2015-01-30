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
    // var dataObj = JSON.stringify(jaunt);
    console.log(jaunt);
    $.post("/saveJaunt",jaunt, function(data){
      data = JSON.parse(data);
    });
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

      //call a GET request while passing in the latLng of the stop location
        //callback function should call a function that creates a popup list for user to select from
        //the function called should return an object that contains the values necessary to create a stop obj
        //this stopObj will be pushed into the jaunt.stops array
        var latLngObj = {
          latitude: latitude,
          longitude: longitude
        };
      $.post("/getYelpData", latLngObj, function(data){
        //data comes back as a JSON object with business names as the keys.
        obtainStopInfo(data);

        $("#submitBtn").click(function(){
          var name = $('input[name=business]:checked')[0].id;
          // var name = $('input[name=business]:checked')[0].id;
          if(name === 'other'){
            name = $('#otherText')[0].value;
          }
          var description = $('#myDescription')[0].value;
          var photoURL = $('#myURL')[0].value;
          var tags = $('#myTag')[0].value;
          var duration = $('#myDuration')[0].value;
          
          //save the user input in an object
          var stopInfoObj = {
            name: name,
            description: description,
            photoURL: photoURL,
            tags: tags,
            duration: duration,
            location: {coordinates:[longitude, latitude]}
          };

          jaunt.stops.push(stopInfoObj);
          $.modal.close();
          $('#modalForm').empty();
        });
      });
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

var obtainStopInfo = function(obj){
  for(var key in obj){
    $("#modalForm").append("<input type='radio' class='options' id='"+key+"' name='business'/>");
    $("#modalForm").append("<span class='business'><label for='"+key+"'>"+obj[key].name+"</label></span>");
    $("#modalForm").append("<br>");
  }
  $("#modalForm").append("<input type='radio' id='other' name='business'/>");
  $("#modalForm").append("<span class='business'><label for='other'>Other</label></span>");
  $("#modalForm").append("<br>");


  $("#modalForm").append("<div id='otherStop'><input id='otherText' type='text' size='50' name='businessName'/></div>");
  $("#modalForm").append("<br>");

  $(document).ready(function(){
    $('#other').change(function(){
      $('#otherStop').show()
    });
    $('.options').change(function(){
      $('#otherText').val("");
      $('#otherStop').hide()
    });
  });

  $("#modalForm").append("<p>Description: <textarea id='myDescription' name='description' cols=48 rows=4></textarea></p>");
  $("#modalForm").append("<p>Photo URL: <input id='myURL' type='url' size='100'></input></p>");
  $("#modalForm").append("<p>Tags: <input id='myTag' type='text' size='40'></input></p>");
  $("#modalForm").append("<p>Duration: <input id='myDuration' type='text' size='10'></input></p>");
  $("#modalForm").append("<br>");
  $("#modalForm").append("<input id='submitBtn' type='button' value='Submit'> <input type='reset'>");

  $.modal($("#modalDiv"), {
    minHeight:400,
    minWidth: 600
  });
};

Init();
});