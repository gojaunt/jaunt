# Jaunt

![Jaunt](/client/www/img/jaunt500.png "Jaunt")


Jaunt lets local explorers find walking adventures that fit their fancy.

## Team

  - __Product Owner__: [Kiran Rao](https://github.com/kranrao) 
  - __Scrum Master__: [Andy Coenen](https://github.com/cannoneyed)
  - __Development Team Members__: [Zachary Lopez](https://github.com/zdlopez), [Benoy Maniara](https://github.com/maniarab)

## Development

Jaunt server is built using express 4 and uses MongoDB. The client is a mobile-first web application built using Ionic. The project is deployed to Heroku.

### Deployment

From within the root directory:

```sh
npm install
bower install
```

If you want to connect to the remote mongoDb, create a .env file with the proper environment variables. See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for more info. The server will connect to a local mongoDB server by default.

Build both the client and server files, and watch for changes, with:

```sh
gulp
```

For remote deployment to Heroku, see [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## API
Jaunt's API is an abstraction on top of Mongo's default query language that allows simpler query objects to be sent to the server to request jaunts. The API endpoints for querying and storing jaunts are, respectively:

```sh
GET  /api/jaunts/
POST /api/jaunts/
```

Jaunts consist of a route, stops along the way, and information about the Jaunt as a whole (like tags, geographic start and end points, and ratings).

Jaunts are represented as a fairly complex BSON object in MongoDB, with a great deal of indexing (including geospatial indexing of the Jaunt as a whole and its compnent stops. For detailed documentation and sample data, refer to [SCHEMA.md](docs/SCHEMA.md).

To query the database for jaunts, simply pass a JSON query object with the desired query parameters to the `GET /api/jaunts` API endpoint. Here's an example:

```sh
$.ajax({
  url: "http://gojaunt.co/api/jaunts",
    type: "GET",
    data: {
      end_location: {
        coordinates: [-122.4025466, 37.7943864],
        range: 1500
      },
      tags : ['beer', 'pizza']
    }
    contentType: 'application/json'
});
```

For detailed information about querying the Jaunts database, refer to [API.md](docs/API.md).

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for contribution guidelines.

## Product Wishlist

See [Product Wishlist](https://github.com/gojaunt/jaunt/wiki/Product-Wishlist) for our product wishlist.
