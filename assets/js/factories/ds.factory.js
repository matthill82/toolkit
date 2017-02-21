angular
    .module('uitoolkit')
    .factory('ds', dsFactory);

/**
 * DS is wrapped in a promise as historically the DS service has been
 * unreliable. This enables a fairly seamless use of the service in a way that
 * is non blocking. So if it is slow to load or doesn't load at all it should
 * have no impact on the rest of the application.
 *
 * @name ds
 * @param $q
 * @param $window
 * @param config
 * @returns {Promise} Resolved with DS when it is loaded.
 */
function dsFactory($q, $window, config) {
    var deferred = $q.defer();

    // Override noop dsLoaded() implementation.
    $window.dsLoaded = function dsLoaded() {
        deferred.resolve(_makeDs());
    };

    // If DS has actually loaded then we can immediately resolve it.
    if (angular.isDefined($window.DS)) {
        deferred.resolve(_makeDs());
    }

    return deferred.promise;

    function _makeDs() {
        return new $window.DS('dataswarm', {
            logLevel: 0,
            serverAddress: config.data_swarm_url
        });
    }
}
