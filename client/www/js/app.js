// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter.factories', []);
angular.module('starter.services', []);

angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'starter.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.jaunts', {
      url: '/jaunts',
      views: {
        'tab-jaunts': {
          templateUrl: 'templates/tab-jaunts.html',
          controller: 'JauntsCtrl'
        }
      }
    })
  .state('tab.jaunt-detail', {
      url: '/jaunts/:jauntId',
      views: {
        'tab-jaunts': {
          templateUrl: 'templates/jaunt-detail.html',
          controller: 'JauntDetailCtrl'
        }
      }
    })
    .state('tab.place-detail', {
      url: '/jaunts/:jauntId/:placeId',
      views: {
        'tab-jaunts': {
          templateUrl: 'templates/place-detail.html',
          controller: 'PlaceDetailCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push("httpInterceptor");
});
