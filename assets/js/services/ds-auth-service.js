angular
    .module('uitoolkit')
    .service('DsAuthService', DsAuthService);

/**
 *
 * @param $http
 * @param config
 * @constructor
 */
function DsAuthService($http, config) {

    this.logIn = logIn;

    /**
     * @param {object} user
     */
    function logIn(user) {
        var dsLoginUrl = config.data_swarm_auth_url + config.data_swarm_get_cookie_url;

        return $http.post(dsLoginUrl, {user: user});
    }

}
