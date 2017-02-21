angular
    .module('uitoolkit')
    .run(polyfillRun);

function polyfillRun() {
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            // Adapted from https://github.com/ptim/phantomjs-polyfill-find/blob/master/find-polyfill.js

            var i;
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }

            if (!angular.isFunction(predicate)) {
                throw new TypeError('predicate must be a function');
            }

            for (i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }

            return undefined;
        };
    }
}
