angular
    .module('uitoolkit')
    .factory('RouteConfigFactory', RouteConfigFactory);

/**
 *
 * @param $http
 * @param $q
 * @param config
 * @returns {Function}
 * @constructor
 */
function RouteConfigFactory($http, $q, config) {
    return function (stateProvider, urlRouterProvider) {
        var defaultRouteUrl = config.routes_default;
        var urlCollection = config.routes_url;

        if (config.wcm_mode === 'EDIT' || config.wcm_mode === 'DESIGN') {
            return $q.resolve();
        }

        return $http
            .get(urlCollection)
            .then(function (data) {
                angular.forEach(data.data, function (state) {
                    if (state.view) {
                        stateProvider.state(state.name, {
                            url: state.view.url,
                            templateUrl: state.view.templateUrl
                        });
                    } else {
                        stateProvider.state(state.name, {
                            url: state.url,
                            views: state.views
                        });
                    }
                });

                urlRouterProvider.otherwise(defaultRouteUrl);
            });
    };
}
