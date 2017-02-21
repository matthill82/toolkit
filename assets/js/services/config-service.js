angular
    .module('uitoolkit')
    .service('ConfigService', ConfigService);

/**
 * @param {$http} $http
 * @param $q
 * @param config
 * @constructor
 */
function ConfigService($http, $q, config) {
    var _config;

    this.get = function (category) {
        if (category) {
            return _config[category];
        }
        return _config;
    };

    this.loadConfigFromAttribute = function () {
        var configUrl = config.config_url;

        if (!configUrl) {
            return $q.resolve('No data-config-url');
        }

        return $http.get(configUrl).then(function (response) {
            _config = response.data;
            return _config;
        });
    };
}
