angular
    .module('uitoolkit')
    .service('HttpLoggerService', HttpLoggerService);

/**
 * Logs intercepted http responses.
 *
 * @typedef {{hostname: string, method: string, pathname:string, status: number, statusText: string, time: number, url: string}} HttpLogLine
 *
 * @param $document
 * @param config
 * @constructor
 */
function HttpLoggerService($document, config) {
    // Use an anchor element's native API for breaking apart the URLs.
    var _anchor = $document[0].createElement('a');
    /** @type {HttpLogLine[]} */
    var _log = [];
    var _logLimit = parseInt(config.http_log);

    this.get = get;
    this.isEnabled = isEnabled;
    this.log = log;

    /**
     * @returns {HttpLogLine[]}
     */
    function get() {
        return _log;
    }

    /**
     * @returns {boolean}
     */
    function isEnabled() {
        return _logLimit > 0;
    }

    /**
     * @param {object} response
     */
    function log(response) {
        // Ignore html requests.
        if (response.config.url.match(/\.html$/)) {
            return;
        }

        if (_log.length === _logLimit) {
            _log.shift();
        }

        _anchor.href = response.config.url;

        _log.push({
            hostname: _anchor.hostname,
            method: response.config.method,
            pathname: _anchor.pathname,
            status: response.status,
            statusText: response.statusText,
            time: response.config.responseTime - response.config.requestTime,
            url: response.config.url
        });
    }
}
