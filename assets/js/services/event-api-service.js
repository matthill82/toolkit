angular
    .module('uitoolkit')
    .service('EventApiService', EventApiService);

/**
 *
 * @param $websocket
 * @param config
 */
function EventApiService($websocket, config) {
    /**
     *
     * @type {Object}
     */
    var _connection = undefined;

    this.onMessage = onMessage;
    this.send = send;


    /**
     *
     * @param request
     */
    function send(request) {
        if (angular.isUndefined(_connection)) {
            _init();
        }

        _connection.send(request);
    }

    /**
     *
     * @param {Function} callback
     * @param {String|RegExp} filter
     * @returns {*}
     */
    function onMessage(callback, filter) {
        if (angular.isUndefined(_connection)) {
            _init();
        }

        return _connection.onMessage(callback, {
            filter: filter,
            autoApply: true
        });
    }

    /**
     *
     * @private
     */
    function _init() {
        if (config.event_api_url) {
            _connection = $websocket(config.event_api_url);
        } else {
            console.log('NO WEBSOCKET URL');
        }
    }
}
