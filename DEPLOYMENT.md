# Jaunt Build & Deployment

Jaunt is a node express server, deployed on Heroku, utilizing a mongoLab hosted mongoDB. Jaunt uses an Ionic framework for a mobile-first front-end.

## Local Deployment

Jaunt is built locally using gulp. To install gulp, npm modules, and bower components, use:

```sh
npm install
bower install
```

After installing dependencies, set up the environment variables necessary for the app by creating a file called '.env'. This file should contain a few variable declarations:

```sh
NODE_ENV=localTest
MONGOLAB_URI=mongodb://<dbuser>:<dbpassword>@ds031611.mongolab.com:31611/heroku_app33432931
```

There are three possible values of NODE_ENV - production, localTest, and local. 'production' is the value of NODE_ENV on the deployed application server, and tells the app to look for mongoDB at the mongoLab URL. 'localTest' also tells the app to look for mongoDB at the mongoLab URL, and is used for connecting a local instance of the app to the real database. 'local' teslls the app to look for mongoDB on the local host - ideal for testing the application in a completely local environment. 

The MONOGLOLAB_URI variable is the URL of the mongoLab DB that the application connects to. You can find the username and password for the variable in the mongoLab account, or in the Application Keys document (NOT hosted in the project). Be VERY careful with this and any sensitive information - even one reference to it in any committed code will require cleaning up the commit of the references and creating new database credentials. DON'T DO IT!

---

The Jaunt server is run locally using foreman - this simulates the environment variables on the heroku deployment server by reading our .env file and running a task described in the Procfile ('local' for a local deployment). To run Jaunt, first install foreman globally, the easiest way being to install the [Heroku toolkit](https://toolbelt.heroku.com/).

Once these variables are set and the heroku tools are installed, run gulp!

```sh
gulp
```

The gulpfile will compile the client code and run the server, automatically refreshing when anything changes!


## Remote Deployment

Jaunt is deployed on Heroku at [gojaunt.herokuapp.com](https://gojaunt.herokuapp.com/).
To begin deployment to Heroku, [Heroku toolkit](https://toolbelt.heroku.com/) must first be installed. After cloning the repo, login to heroku using:

```sh
heroku login
```

with your credentials for the gojaunt heroku account. In order to deploy to heroku, you need to initialize a git remote pointing to heroku:

```sh
heroku git:remote -a gojaunt
```

Now you can deploy the code to heroku:

```sh
git push heroku master
```

Heroku will install all dependencies listed in package.json and run the Procfile. The keyword 'web' is special - it tells heroku what command to execute once all dependencies are installed and any additional scripts are executed. In the case of our server, our Procfile is simply:

```sh
web: node index.js
```

The environment variables for the jaunt application are already configured on heroku. To view these environment variables, use:

```sh
heroku config
```
