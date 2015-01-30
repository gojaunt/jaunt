angular.module("starter.services").service("queryStringParam", function () {
    //Based on https://github.com/jquery/jquery/blob/master/src/serialize.js#L50
 
    var encodedSpaceRegExp = /%20/g;
 
    var include = function (name) {
        return ["$promise", "$resolved"].indexOf(name) == -1;
    };
 
    var buildParams = function (prefix, object, add) {
        if (angular.isArray(object)) {
            object.forEach(function (value, index) {
                buildParams(prefix + "[]", value, add);
            });
        } else if (angular.isDate(object)) {
            add(prefix, object.toISOString());
        } else if (angular.isObject(object)) {
            angular.forEach(object, function (propertyValue, propertyName) {
                if (include(propertyName)) {
                    buildParams(prefix + "[{0}]".format(propertyName), propertyValue, add);
                }
            });
        } else {
            add(prefix, object);
        }
    };
 
    return function (params) {
        var result = [];
 
        var add = function (key, value) {
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value));
        };
 
        angular.forEach(params, function (paramValue, paramName) {
            if (include(paramName)) {
                buildParams(paramName, paramValue, add);
            }
        });
 
        return result.join("&").replace(encodedSpaceRegExp, "+");
    };
});