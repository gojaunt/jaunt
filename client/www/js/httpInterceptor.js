'use strict';
 
angular.module('starter.factories').factory('httpInterceptor', function (queryStringParam) {

  var prepareQueryForParam = function (uri) {
      if (uri.query()) {
          uri.query(uri.query() + '&');
      } else {
          uri.query(''); //Otherwise the result would be 'null{name}={value}'.
      }
  };

  return {
      request: function (config) {
          var uri = URI(config.url);

          //Serialize query string parameters in a way the web API understands.
          if (config.params && ['get', 'query'].indexOf(config.method.toLowerCase()) !== -1) {
              var serializedParams = queryStringParam(config.params);
              prepareQueryForParam(uri);
              uri.query(uri.query() + serializedParams);
              config.params = null;
          }

          config.url = uri.toString();

          return config;
      }
  };
});