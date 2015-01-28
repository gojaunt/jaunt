# Jaunt

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

If you want to connect to the remote mongoDb, create a .env file with the proper environment variables. See [DEPLOYMENT.md](DEPLOYMENT.md) for more info. The server will connect to a local mongoDB server by default.

Build both the client and server files, and watch for changes, with:

```sh
gulp
```

For remote deployment to Heroku, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
