var mongoose = require('mongoose');

var JauntSchema = new mongoose.Schema({
  meta: {
    title : String,
    categories : [String],
    votes : Number,
    rating : Number,
    timeTag: String,
<<<<<<< HEAD
    tags : [String]
=======
    commentId : Number,
    tags : [String],
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
  },
  distance : {
     text : String,
     value : Number
  },
  duration : {
     text : String,
     value : Number
  },
  start_location : {
<<<<<<< HEAD
    type: { 
      type: String,
      default: 'Point'
    }, 
    coordinates: [Number]
  },
  end_location : {
    type: { 
      type: String,
      default: 'Point'
    }, 
    coordinates: [Number]
  },
  bounds : {
     northeast : {
      type: { 
        type: String,
        default: 'Point'
      }, 
      coordinates: [Number]
     },
     southwest : {
      type: { 
        type: String,
        default: 'Point'
      }, 
      coordinates: [Number]
=======
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
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
          type: { 
            type: String,
            default: 'Point'
          }, 
          coordinates: [Number]
=======
           lat : Number,
           lng : Number
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
        },
        html_instructions : String,
        maneuver : String,
        start_location : {
<<<<<<< HEAD
          type: { 
            type: String,
            default: 'Point'
          }, 
          coordinates: [Number]
=======
           lat : Number,
           lng : Number
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
        }
      }
   ],
  stops: [
    {
      name : String,
      description : String,
      photoUrl: String,
      tags : [String],
      duration : {
         text : String,
         value : String
      },
      location : {
<<<<<<< HEAD
        type: { 
          type: String,
          default: 'Point'
        }, 
        coordinates: [Number]
      }
=======
                 lat : Number,
                 lng : Number
              }
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
    }
  ]
});

JauntSchema.index({ start_location : '2dsphere' });
JauntSchema.index({ end_location : '2dsphere' });

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
<<<<<<< HEAD
=======
    commentId : 1,
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
    tags : ["beer", "dogs"],
    },
    bounds : {
       northeast : {
<<<<<<< HEAD
        type: 'Point',
        coordinates : [-122.4085524, 37.7854137]
       },
       southwest : {
        type: 'Point',
        coordinates : [-122.4090658, 37.7834319]
=======
          lat : 37.7854137,
          lng : -122.4085524
       },
       southwest : {
          lat : 37.7834319,
          lng : -122.4090658
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
       }
    },
    "distance" : {
       "text" : "900 ft",
       "value" : 280
    },
    "duration" : {
       "text" : "4 min",
       "value" : 218
    },
<<<<<<< HEAD
    "start_location" : {
      "type" : "Point",
       "coordinates" : [-122.4088122, 37.7834319],
    },
    "end_location" : {
      "type" : "Point",
       "coordinates" : [-122.4090658, 37.7853691]
    },
=======
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4085524, 37.7836379]
          },
          "html_instructions" : "Head \u003cb\u003enortheast\u003c/b\u003e on \u003cb\u003eMarket St\u003c/b\u003e toward \u003cb\u003eTurk St\u003c/b\u003e",
          "start_location" : {
            type: 'Point',
            coordinates : [-122.4088122, 37.7834319]
=======
             "lat" : 37.7836379,
             "lng" : -122.4085524
          },
          "html_instructions" : "Head \u003cb\u003enortheast\u003c/b\u003e on \u003cb\u003eMarket St\u003c/b\u003e toward \u003cb\u003eTurk St\u003c/b\u003e",
          "start_location" : {
             "lat" : 37.7834319,
             "lng" : -122.4088122
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4086873, 37.7844507]
=======
             "lat" : 37.7844507,
             "lng" : -122.4086873
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
          },
          "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e toward \u003cb\u003eEddy St\u003c/b\u003e",
          "maneuver" : "turn-left",
          "start_location" : {
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4085524, 37.7836379]
=======
             "lat" : 37.7836379,
             "lng" : -122.4085524
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4085706, 37.78446599999999]
=======
             "lat" : 37.78446599999999,
             "lng" : -122.4085706
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
          },
          "html_instructions" : "Turn \u003cb\u003eright\u003c/b\u003e onto \u003cb\u003eEddy St\u003c/b\u003e",
          "maneuver" : "turn-right",
          "start_location" : {
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4086873, 37.7844507]
=======
             "lat" : 37.7844507,
             "lng" : -122.4086873
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4087533, 37.7854137]
=======
             "lat" : 37.7854137,
             "lng" : -122.4087533
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
          },
          "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eCyril Magnin St\u003c/b\u003e",
          "maneuver" : "turn-left",
          "start_location" : {
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4085706, 37.78446599999999]
=======
             "lat" : 37.78446599999999,
             "lng" : -122.4085706
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4090658, 37.7853691]
=======
             "lat" : 37.7853691,
             "lng" : -122.4090658
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
          },
          "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eEllis St\u003c/b\u003e\u003cdiv style=\"font-size:0.9em\"\u003eDestination will be on the right\u003c/div\u003e",
          "maneuver" : "turn-left",
          "start_location" : {
<<<<<<< HEAD
            type: 'Point',
            coordinates : [-122.4087533, 37.7854137]
=======
             "lat" : 37.7854137,
             "lng" : -122.4087533
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
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
<<<<<<< HEAD
          type: 'Point',
          coordinates : [-122.421507, 37.785572]
        }
=======
                   lat : 37.785572,
                   lng :  -122.421507
                }
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
      },
      {
        name : "Vertigo",
        description : "get your dance on",
        photoUrl: "somePhotoUrl",
        tags : ["Drinking", "Dancing"],
        time : 120,
        API : "Some API String",
        location : {
<<<<<<< HEAD
          type: 'Point',
          coordinates : [-122.419894, 37.787534]
        }
=======
                   lat : 37.787534,
                   lng : -122.419894
                }
>>>>>>> 046555b4e6a349a5425c0891d37e179bf4d4fa3d
      }
    ]
});

myJaunt.save();
*/




