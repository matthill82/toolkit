angular
    .module('uitoolkit')
    .filter('relativeUrl', relativeUrlFilterFactory);

/**
 * This is essential for phonegap, it doesn't do anything in any other use case.
 *
 * @param {$window} $window
 */
function relativeUrlFilterFactory($window) {
    function relativeUrlFilter(url) {
        var baseUrl;
        var location;
        var pagePath;

        // Only rewrite internal URLs
        if (url && url.indexOf('/') === 0) {
            location = $window.location;

            // If the page is served from a local file system try to relativize the url
            if (location.protocol === 'file:') {
                pagePath = location.pathname;
                baseUrl = pagePath.split('/www')[0] + '/www';
                return baseUrl + url;
            }
        }

        return url;
    }

    return relativeUrlFilter;
}
