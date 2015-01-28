# Jaunt API

Jaunt's API is an abstraction on top of Mongo's default query language that allows simpler query objects to be sent to the server to request jaunts. The API endpoints for querying and storing jaunts are, respectively:

```sh
GET  /api/jaunts/
POST /api/jaunts/
```

Jaunts consist of a route, stops along the way, and information about the Jaunt as a whole (like tags, geographic start and end points, and ratings).

Jaunts are represented as a fairly complex BSON object in MongoDB, with a great deal of indexing (including geospatial indexing of the Jaunt as a whole and its compnent stops. By creating a query object containing various query parameters, groups of jaunts or single jaunts can be selected from the database, like so:

```js
var queryObject = {
  start_location : {
    coordinates: [-122.4025466, 37.7943864],
    range: 1500
  },
  tags : ['happy hour'],
  categories : ['deals'],
  times: ['all day'],
  duration : {
    max : 300
  }
  distance: {
    min : 1000,
    max : 2500
  },
  sortBy : '-rating'
};

$.ajax({
  url: "http://gojaunt.co/api/jaunts",
  type: "GET",
  data: queryObject
  contentType: 'application/json',
  success: function (data) {
    console.log('Found Jaunts:', data)
  }
});
```

Available query object parameters are:

```
start_location : {
  coordinates: [(longitude), (latitude)],
  range: (distance in meters)
}
```

```
end_location : {
  coordinates: [(longitude), (latitude)],
  range: (distance in meters)
}
```

```
tags : [(tag)] # an array of tag strings (lowercase!)
```

```
categories : [(category)] # an array of category strings (lowercase!)
```

```
times : [(time)] # an array of time strings (lowercase!)
```

```
distance : {
  min: (minimum distance, in meters),
  max: (maximum distance, in meters)   # both values optional
} 
```

```
duration : {
  min: (minimum duration, in seconds),
  max: (maximum duration, in seconds)   # both values optional
} 
```

```
sortBy : (sortString) 
# currently only 'rating' and 'votes' are allowed. Both may be prefixed with '-' to invert order.
```

Jaunts may also be searched for in terms of individual stops they contain. This is achieved by adding a stops subquery object to the query object.

```
stops : {
  name: (name of stop),
  tags: [(tag), (tag)] # array of stop tags (lowercase!)
} 
```

Here's an example of a query for all jaunts containing 'HRD Cafe' as one of their stops, and starting around Hack Reactor:

```js
var queryObject = {
  start_location : {
    coordinates: [-122.4025466, 37.7943864],
    range: 1500
  },
  stops : {
    name : 'HRD Cafe'
  }
}
```

In addition, the stops are also indexed about their individual geoJSON data points and jaunts may be queried by their component stops and the component stop properties, allowing for potentially powerful jaunt hybridizations. Here's an example query, looking for all jaunts with a stop within 100 meters of Hack Reactor. 


```js
var queryObject = {
  stops : {
    location: {
      coordinates: [-122.4025466, 37.7943864],
      range: 100
    }
  }
}
```
