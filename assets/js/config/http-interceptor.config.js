angular
    .module('uitoolkit')
    .config(httpInterceptorConfig);

/**
 * @param {$httpProvider} $httpProvider
 */
function httpInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('httpLoggerInterceptor');
}
