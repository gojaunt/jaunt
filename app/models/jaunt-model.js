var mongoose = require('mongoose');
var db = require('../mongo-config');

var JauntSchema = new db.Schema({
  meta: {
    title : String,
    categories : String,
    votes : Number,
    rating : Number,
    timeTag: String,
    commentId : Number
  },
  path : {
   routes : [
      {
         bounds : {
            northeast : {
               lat : Number,
               lng : Number
            },
            southwest : {
               lat : Number,
               lng : Number
            }
         },
         copyrights : String,
         legs : [
            {
               distance : {
                  text : String,
                  value : Number
               },
               duration : {
                  text : String,
                  value : Number
               },
               end_address : String,
               end_location : {
                  lat : Number,
                  lng : Number
               },
               start_address : String,
               start_location : {
                  lat : Number,
                  lng : Number
               },
               steps : [
                  {
                     distance : {
                        text : String,
                        value : Number
                     },
                     duration : {
                        text : String,
                        value : String
                     },
                     end_location : {
                        lat : Number,
                        lng : Number
                     },
                     html_instructions : String,
                     polyline : {
                        points : String
                     },
                     start_location : {
                        lat : Number,
                        lng : Number
                     },
                     travel_mode : String
                  },
               ],
               via_waypoint : [Number]
            }
         ],
         overview_polyline : {
            points : String
         },
         summary : String,
         warnings : [
            String
         ],
         waypoint_order : [Number]
      }
   ],
   status : String
  },
  stops: [
    {
      name : String,
      description : String,
      photoUrl: String,
      tags : [String],
      context : String,
      time: Number,
      API : String
    }
  ]

});

JauntSchema.pre('save', function(next){
  
  next();
});

// module.exports = mongoose.model('Link', LinkSchema);
var Jaunt = mongoose.model('Jaunt', JauntSchema);
module.exports = Jaunt;


/*  The below is sample data creating and saving a jaunt to the db.
var myJaunt = new Jaunt(

  {  
    meta: {
    title : "my awesome jaunt",
    categories : "superfun",
    votes : 12,
    rating : 3.5,
    timeTag: "All Day",
    commentId : 1
    },
    path: {

   "routes" : [
      {
         "bounds" : {
            "northeast" : {
               "lat" : 37.7854137,
               "lng" : -122.4085524
            },
            "southwest" : {
               "lat" : 37.7834319,
               "lng" : -122.4090658
            }
         },
         "copyrights" : "Map data ©2015 Google",
         "legs" : [
            {
               "distance" : {
                  "text" : "0.2 mi",
                  "value" : 268
               },
               "duration" : {
                  "text" : "4 mins",
                  "value" : 218
               },
               "end_address" : "174 Ellis Street, San Francisco, CA 94102, USA",
               "end_location" : {
                  "lat" : 37.7853691,
                  "lng" : -122.4090658
               },
               "start_address" : "944 Market Street, San Francisco, CA 94102, USA",
               "start_location" : {
                  "lat" : 37.7834319,
                  "lng" : -122.4088122
               },
               "steps" : [
                  {
                     "distance" : {
                        "text" : "105 ft",
                        "value" : 32
                     },
                     "duration" : {
                        "text" : "1 min",
                        "value" : 27
                     },
                     "end_location" : {
                        "lat" : 37.7836379,
                        "lng" : -122.4085524
                     },
                     "html_instructions" : "Head \u003cb\u003enortheast\u003c/b\u003e on \u003cb\u003eMarket St\u003c/b\u003e toward \u003cb\u003eTurk St\u003c/b\u003e",
                     "polyline" : {
                        "points" : "mqreF`~bjVMO[c@"
                     },
                     "start_location" : {
                        "lat" : 37.7834319,
                        "lng" : -122.4088122
                     },
                     "travel_mode" : "WALKING"
                  },
                  {
                     "distance" : {
                        "text" : "299 ft",
                        "value" : 91
                     },
                     "duration" : {
                        "text" : "1 min",
                        "value" : 73
                     },
                     "end_location" : {
                        "lat" : 37.7844507,
                        "lng" : -122.4086873
                     },
                     "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e toward \u003cb\u003eEddy St\u003c/b\u003e",
                     "maneuver" : "turn-left",
                     "polyline" : {
                        "points" : "wrreFl|bjVaDZ"
                     },
                     "start_location" : {
                        "lat" : 37.7836379,
                        "lng" : -122.4085524
                     },
                     "travel_mode" : "WALKING"
                  },
                  {
                     "distance" : {
                        "text" : "33 ft",
                        "value" : 10
                     },
                     "duration" : {
                        "text" : "1 min",
                        "value" : 7
                     },
                     "end_location" : {
                        "lat" : 37.78446599999999,
                        "lng" : -122.4085706
                     },
                     "html_instructions" : "Turn \u003cb\u003eright\u003c/b\u003e onto \u003cb\u003eEddy St\u003c/b\u003e",
                     "maneuver" : "turn-right",
                     "polyline" : {
                        "points" : "ywreFh}bjVCW"
                     },
                     "start_location" : {
                        "lat" : 37.7844507,
                        "lng" : -122.4086873
                     },
                     "travel_mode" : "WALKING"
                  },
                  {
                     "distance" : {
                        "text" : "351 ft",
                        "value" : 107
                     },
                     "duration" : {
                        "text" : "1 min",
                        "value" : 87
                     },
                     "end_location" : {
                        "lat" : 37.7854137,
                        "lng" : -122.4087533
                     },
                     "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eCyril Magnin St\u003c/b\u003e",
                     "maneuver" : "turn-left",
                     "polyline" : {
                        "points" : "}wreFp|bjVMBkBRaAJ"
                     },
                     "start_location" : {
                        "lat" : 37.78446599999999,
                        "lng" : -122.4085706
                     },
                     "travel_mode" : "WALKING"
                  },
                  {
                     "distance" : {
                        "text" : "92 ft",
                        "value" : 28
                     },
                     "duration" : {
                        "text" : "1 min",
                        "value" : 24
                     },
                     "end_location" : {
                        "lat" : 37.7853691,
                        "lng" : -122.4090658
                     },
                     "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eEllis St\u003c/b\u003e\u003cdiv style=\"font-size:0.9em\"\u003eDestination will be on the right\u003c/div\u003e",
                     "maneuver" : "turn-left",
                     "polyline" : {
                        "points" : "y}reFt}bjVBh@BT"
                     },
                     "start_location" : {
                        "lat" : 37.7854137,
                        "lng" : -122.4087533
                     },
                     "travel_mode" : "WALKING"
                  }
               ],
               "via_waypoint" : []
            }
         ],
         "overview_polyline" : {
            "points" : "mqreF`~bjVi@s@aDZCWyBVaAJBh@BT"
         },
         "summary" : "Cyril Magnin St",
         "warnings" : [
            "Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths."
         ],
         "waypoint_order" : []
      }
   ],
   "status" : "OK"
  },
    stops: [
      {
        name : "Tommy's Joint",
        description : "get the burger",
        photoUrl: "somePhotoUrl",
        tags : ["Drinking", "Food"],
        context : "Bars on a Sunday",
        time: 60,
        API : "Some API String"
      },
      {
        name : "Vertigo",
        description : "get your dance on",
        photoUrl: "somePhotoUrl",
        tags : ["Drinking", "Dancing"],
        context : "partying",
        time : 120,
        API : "Some API String"
      }
    ]


}

  );

myJaunt.save();
*/