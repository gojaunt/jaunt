# Jaunt Schema

```js
Jaunt = {
  meta: {
    title : String,
    categories : [String] (lowercase!),
    author: String,
    votes : Number,
    rating : Number (0-5),
    timeTag: [String] (lowercase),
    tags : [String] (lowercase!)
  },
  distance : {
     text : String (eg '5 miles'),
     value : Number (meters)
  },
  duration : {
     text : String (eg '5 hours'),
     value : Number (seconds)
  },
  start_location : {
    type: 'Point',
    coordinates: [longitude, latitude]
  },
  end_location : {
    type: 'Point',
    coordinates: [longitude, latitude]
  },
  bounds : {
     northeast : {
       type: 'Point',
       coordinates: [longitude, latitude]
     },
     southwest : {
      type: 'Point',
      coordinates: [longitude, latitude]
     }
  },
  steps : [
     {
        distance : {
           text : String (eg '5 miles'),
           value : Number (meters)
        },
        duration : {
           text : String (eg '1 hour'),
           value : String (seconds)
        },
        start_location : {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        end_location : {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        html_instructions : String (eg 'Turn left at Howard St.'),
        maneuver : String (eg 'Turn Left')
      }
   ],
  stops: [
    {
      name : String,
      description : String,
      photoUrl: String,
      tags : [String] (lowercase!),
      duration : {
         text : String (eg '1 hour'),
         value : String (seconds)
      },
      location : {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    }
  ]
}
```
A Jaunt is a fairly complex object - it contains eight main pieces of information:

1. A meta object describes the jaunt - information like title, author, tags, and votes.

1. A distance object describes the total length of the jaunt in distance.

1. A duration object describes the total length of the jaunt in time.

1. A start location, expressed as a geoJSON object.

1. An end location, expressed as a geoJSON object.

1. A bounds object, describing the northeast and southwest corners of the jaunt.

1. A steps array, containing individual steps on the walking route of the jaunt. Each step contains distance, duration, start and end locations, and instructions (essentially walking directions pulled from the google directions API).

1. A stops array, containing individual stops along the way, with information about the stop and a geoJSON encoded location.


geoJSON encoding of the location data is used because mongoDB allows for indexing and geospatial querying based on this specific format. REMEMBER, geoJSON uses [longitude, latitude] format as opposed to google maps which uses [latitude, longitude] format. Of course. A geoJSON object must contain a 'type' property (in our case a default of 'Point') and a coordinates array.

## Example:

```js
var myJaunt = {  
  meta: {
    title : "my awesome jaunt",
    author : 'Zach',
    categories : ["superfun"],
    votes : 12,
    rating : 3.5,
    times: ["All Day"],
    tags : ["beer", "dogs"],
  },
  bounds : {
     northeast : {
      coordinates : [-122.4085524, 37.7854137]
     },
     southwest : {
      coordinates : [-122.4090658, 37.7834319]
     }
  },
  distance : {
     text : "900 ft",
     value : 280
  },
  duration : {
     text : "4 min",
     value : 218
  },
  start_location : {
     coordinates : [-122.4088122, 37.7834319],
  },
  end_location : {
     coordinates : [-122.4090658, 37.7853691]
  },
  steps : [
     {
        distance : {
           text : "105 ft",
           value : 32
        },
        duration : {
           text : "1 min",
           value : 27
        },
        end_location : {
          coordinates : [-122.4085524, 37.7836379]
        },
        html_instructions : "Head \u003cb\u003enortheast\u003c/b\u003e on \u003cb\u003eMarket St\u003c/b\u003e toward \u003cb\u003eTurk St\u003c/b\u003e",
        start_location : {
          coordinates : [-122.4088122, 37.7834319]
        }
     },
     {
        distance : {
           text : "299 ft",
           value : 91
        },
        duration : {
           text : "1 min",
           value : 73
        },
        end_location : {
          coordinates : [-122.4086873, 37.7844507]
        },
        html_instructions : "Turn \u003cb\u003eleft\u003c/b\u003e toward \u003cb\u003eEddy St\u003c/b\u003e",
        maneuver : "turn-left",
        start_location : {
          coordinates : [-122.4085524, 37.7836379]
        }
     },
     {
        distance : {
           text : "33 ft",
           value : 10
        },
        duration : {
           text : "1 min",
           value : 7
        },
        end_location : {
          coordinates : [-122.4085706, 37.78446599999999]
        },
        html_instructions : "Turn \u003cb\u003eright\u003c/b\u003e onto \u003cb\u003eEddy St\u003c/b\u003e",
        maneuver : "turn-right",
        start_location : {
          coordinates : [-122.4086873, 37.7844507]
        }
     },
     {
        distance : {
           text : "351 ft",
           value : 107
        },
        duration : {
           text : "1 min",
           value : 87
        },
        end_location : {
          coordinates : [-122.4087533, 37.7854137]
        },
        html_instructions : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eCyril Magnin St\u003c/b\u003e",
        maneuver : "turn-left",
        start_location : {
          coordinates : [-122.4085706, 37.78446599999999]
        }
     },
     {
        distance : {
           text : "92 ft",
           value : 28
        },
        duration : {
           text : "1 min",
           value : 24
        },
        end_location : {
          coordinates : [-122.4090658, 37.7853691]
        },
        html_instructions : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eEllis St\u003c/b\u003e\u003cdiv style=\"font-size:0.9em\"\u003eDestination will be on the right\u003c/div\u003e",
        maneuver : "turn-left",
        start_location : {
          coordinates : [-122.4087533, 37.7854137]
        }
     }
  ],
  stops: [
    {
      name : "Tommy's Joynt",
      description : "get the burger",
      photoUrl: "somePhotoUrl",
      tags : ["Drinking", "Food"],
      time: 60,
      location : {
        coordinates : [-122.421507, 37.785572]
      }
    },
    {
      name : "Vertigo",
      description : "get your dance on",
      photoUrl: "somePhotoUrl",
      tags : ["Drinking", "Dancing"],
      time : 120,
      location : {
        coordinates : [-122.419894, 37.787534]
      }
    }
  ]
}
```


