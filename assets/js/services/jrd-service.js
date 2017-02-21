angular
    .module('uitoolkit')
    .service('JrdService', JrdService);

/**
 * @param $http
 * @param $q
 * @constructor
 * @param config
 * @returns {object}
 */
function JrdService($http, $q, config) {
    var _jrd;

    this.get = get;
    this.init = init;

    function init() {
        var jrdUrl = config.jrd_url;

        if (_jrd) {
            throw new Error('JRD already initialized');
        }

        if (!jrdUrl) {
            return $q.resolve('No data-jrd-url');
        }

        return $http.get(jrdUrl)
            .then(function (response) {
                _jrd = response.data;
            }, function () {
                throw new Error('Failed to load JRD');
            });
    }

    /**
     *
     * @param segment
     * @param area
     * @returns {*}
     */
    function get(segment, area) {
        var items;

        if (!_jrd) {
            throw new Error('JRD not initialized');
        }

        angular.forEach(_jrd, function (value) {
            if (!items && value.segmentName === segment) {
                if (value.areas[area]) {
                    items = value.areas[area].items;
                }
            }
        });

        if (items) {
            // Area found
            return items;
        }

        // Missing segment or area in the specified segment
        // - check in global if not already doing that
        if (segment !== 'global') {
            return get('global', area);
        }

        // Missing in global as well - undefined
    }
}
