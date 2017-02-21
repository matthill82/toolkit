angular
    .module('uitoolkit')
    .factory('httpLoggerInterceptor', httpLoggerInterceptorFactory);

/**
 * @param {HttpLoggerService} HttpLoggerService
 * @returns {object}
 */
function httpLoggerInterceptorFactory(HttpLoggerService) {
    if (!HttpLoggerService.isEnabled()) {
        // If the service isn't enabled there is no point in running the
        // interceptor, just return an empty interceptor.
        return {};
    }

    return {
        request: function (config) {
            config.requestTime = new Date();

            return config;
        },
        requestError: function (config) {
            config.requestTime = new Date();

            return config;
        },
        response: function (response) {
            response.config.responseTime = new Date();

            HttpLoggerService.log(response);

            return response;
        },
        responseError: function (response) {
            response.config.responseTime = new Date();

            HttpLoggerService.log(response);

            return response;
        }
    };
}
