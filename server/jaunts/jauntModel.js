var mongoose = require('mongoose');

var JauntSchema = new mongoose.Schema({
  meta: {
    title : String,
    categories : [String],
    votes : Number,
    rating : Number,
    timeTag: String,
    commentId : Number,
    tags : [String],
  },
  start_location : {
     lat : Number,
     lng : Number
  },
  end_location : {
     lat : Number,
     lng : Number
  },
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
        maneuver : String,
        start_location : {
           lat : Number,
           lng : Number
        }
      }
   ],
  stops: [
    {
      name : String,
      description : String,
      photoUrl: String,
      tags : [String],
      time: Number,
      API : String,
      location : {
                 lat : Number,
                 lng : Number
              }
    }
  ]
});

JauntSchema.pre('save', function(next){ 
  next();
});

module.exports = mongoose.model('Jaunt', JauntSchema);


/*  The below is sample data creating and saving a jaunt to the db.
var myJaunt = new Jaunt(

  {  
    meta: {
    title : "my awesome jaunt",
    categories : "superfun",
    votes : 12,
    rating : 3.5,
    timeTag: "All Day",
    commentId : 1,
    tags : ["beer", "dogs"],
    },
    bounds : {
       northeast : {
          lat : 37.7854137,
          lng : -122.4085524
       },
       southwest : {
          lat : 37.7834319,
          lng : -122.4090658
       }
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
          "start_location" : {
             "lat" : 37.7834319,
             "lng" : -122.4088122
          }
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
          "start_location" : {
             "lat" : 37.7836379,
             "lng" : -122.4085524
          }
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
          "start_location" : {
             "lat" : 37.7844507,
             "lng" : -122.4086873
          }
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
          "start_location" : {
             "lat" : 37.78446599999999,
             "lng" : -122.4085706
          }
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
          "start_location" : {
             "lat" : 37.7854137,
             "lng" : -122.4087533
          }
       }
    ],
    stops: [
      {
        name : "Tommy's Joint",
        description : "get the burger",
        photoUrl: "somePhotoUrl",
        tags : ["Drinking", "Food"],
        time: 60,
        API : "Some API String",
        location : {
                   lat : 37.785572,
                   lng :  -122.421507
                }
      },
      {
        name : "Vertigo",
        description : "get your dance on",
        photoUrl: "somePhotoUrl",
        tags : ["Drinking", "Dancing"],
        time : 120,
        API : "Some API String",
        location : {
                   lat : 37.787534,
                   lng : -122.419894
                }
      }
    ]


}

  );

myJaunt.save();
*/




