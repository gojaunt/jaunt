$(function(){



  $('button').click(function(){

    var jauntJSON = {"stops":[{"name":"Brenda's French Soul Food","description":"great fried chicken!","photoURL":"","tags":["soul food","chicken","fried"],"duration":{"text":"","value":7200},"location":{"coordinates":[-122.41913080215454,37.783019360415665]}},{"name":"Radmans Produce Market","description":"This grocery store has great wines","photoURL":"","tags":["grocery","organic","groceries"],"duration":{"text":"","value":7200},"location":{"coordinates":[-122.41266131401062,37.78282433414079]}}],"start_location":{"coordinates":[-122.42106949999999,37.7833775]},"steps":[{"distance":{"text":"23 ft","value":7},"duration":{"text":"","value":4.69},"end_location":{"coordinates":[-122.42099330000002,37.7833876]},"html_instructions":"Head <b>east</b> on <b>Willow St</b> toward <b>Van Ness Ave</b>","maneuver":"","start_location":{"coordinates":[-122.42106949999999,37.7833775]}},{"distance":{"text":"180 ft","value":55},"duration":{"text":"","value":36.85},"end_location":{"coordinates":[-122.4209017,37.7828997]},"html_instructions":"Turn <b>right</b> onto <b>Van Ness Ave</b>","maneuver":"turn-right","start_location":{"coordinates":[-122.42099330000002,37.7833876]}},{"distance":{"text":"489 ft","value":149},"duration":{"text":"","value":99.83000000000001},"end_location":{"coordinates":[-122.4192248,37.7830976]},"html_instructions":"Turn <b>left</b> onto <b>Eddy St</b>","maneuver":"turn-left","start_location":{"coordinates":[-122.4209017,37.7828997]}},{"distance":{"text":"33 ft","value":10},"duration":{"text":"","value":6.7},"end_location":{"coordinates":[-122.41920349999998,37.7830086]},"html_instructions":"Turn <b>right</b> onto <b>Polk St</b><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-right","start_location":{"coordinates":[-122.4192248,37.7830976]}},{"distance":{"text":"312 ft","value":95},"duration":{"text":"","value":63.650000000000006},"end_location":{"coordinates":[-122.4190036,37.7821707]},"html_instructions":"Head <b>south</b> on <b>Polk St</b> toward <b>Turk St</b>","maneuver":"","start_location":{"coordinates":[-122.41920349999998,37.7830086]}},{"distance":{"text":"0.3 mi","value":555},"duration":{"text":"","value":371.85},"end_location":{"coordinates":[-122.41276920000001,37.7829657]},"html_instructions":"Turn <b>left</b> onto <b>Turk St</b>","maneuver":"turn-left","start_location":{"coordinates":[-122.4190036,37.7821707]}}],"end_location":{"coordinates":[-122.41276920000001,37.7829657]},"meta":{"title":"Chicken and Groceries","categories":["short","food","groceries"],"author":"Jaunty","votes":0,"rating":5,"timeTag":["all day"],"tags":["soul food","chicken","fried","grocery","organic","groceries"]},"distance":{"text":"","value":871},"duration":{"text":"","value":14983.57},"bounds":{"northeast":[-122.4190036,37.7833876],"southwest":[-122.42106949999999,37.7821707]}}


    $.ajax({
      url: "http://localhost:5000/api/jaunts",
        type: "GET",
        data: {title: jauntJSON.meta.title},
        contentType: 'application/json',
        success: function (data) {

          if (JSON.stringify(data) === '[]') {
            console.log('post');
            $.ajax({
              url: "http://localhost:5000/api/jaunts",
                type: "POST",
                data: JSON.stringify(jauntJSON),
                contentType: 'application/json',
                success: function (data) {
                  console.log(data);
                },
                error: function (error) {
                  console.log('error!', error);
                }
            });
          }

        },
        error: function (error) {
          console.log('error!', error);
        }
    });

    // $.ajax({
    //   url: "http://localhost:5000/api/jaunts",
    //     type: "GET",
    //     data: {},
    //     contentType: 'application/json',
    //     success: function (data) {
    //       console.log(data);
    //     },
    //     error: function (error) {
    //       console.log('error!', error);
    //     }
    //   });

    /*



    */

        
  /*
    var newJaunt = {};

    console.log(newJaunt);
    newJaunt.meta = {
      title : 'Chicken and Groceries',
      categories : ['short', 'food', 'groceries'],
      author: 'Jaunty',
      votes : 0,
      rating : 5,
      timeTag: ['all day'],
      tags : []
    };
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

    console.log(newJaunt);

   */ 

  });
  

});