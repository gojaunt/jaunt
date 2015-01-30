// Part of the fix of Angular's non-nested parsing of objects converted into querystring

(function () {
    //Example: "{0}, {1}!".format("Hello", "Gabriel") --> "Hello, Gabriel!"
    String.prototype.format = function () {
        var args = arguments;
 
        return this.replace(/{(\d+)}/g, function (match, number) {
            return args[number] != undefined ? args[number] : "";
        });
    };
})();