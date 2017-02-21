angular
    .module('uitoolkit')
    .controller('LoginController', LoginController);

/**
 * @param $http
 * @param {$rootScope.Scope} $scope
 * @param $state
 * @param $window
 * @param AuthenticationService
 * @param {DsAuthService} DsAuthService
 * @param {DsEventService} DsEventService
 * @param {StateManagement} StateManagement
 * @param {ToastService} ToastService
 * @param {UserService} UserService
 * @param config
 * @constructor
 */
function LoginController(
    $http,
    $scope,
    $state,
    $window,
    AuthenticationService,
    DsAuthService,
    DsEventService,
    StateManagement,
    ToastService,
    UserService,
    config
) {
    var ERROR_INVALID_LOGIN = 'invalid_login';
    var ERROR_SESSION_TIMEOUT = 'session_timed_out';
    var ERROR_TYPE = 'error';

    $scope.tryAuthentication = tryAuthentication;

    reset();

    /**
     *
     * @param buttonPath
     */
    function goToHomePage(buttonPath) {
        buttonPath = buttonPath.replaceHTMLSuffix();
        $state.go(buttonPath);
    }

    function reset() {
        var storage;
        var sessionStorage;

        if (angular.isDefined($window.honeybee)) {
            storage = $window.honeybee.require('HbStorage');
            sessionStorage = storage('session');

            // Clear HoneyBee
            sessionStorage.clear();
        }

        // Clear StateManagement
        StateManagement.clear();

        // Exit an incomplete journey if there is one.
        DsEventService.setJourneyExit();
    }

    /**
     *
     * @param buttonPath
     * @param serviceUrl
     * @param sessionTimeout
     * @param formInvalidCredentials
     * @param formUnableLogin
     * @param profileUrl
     * @param authEnabled
     */
    function tryAuthentication(buttonPath, serviceUrl, sessionTimeout, formInvalidCredentials, formUnableLogin, profileUrl, authEnabled) {
        var data = 'j_username=' + this.username + '&j_password=' + this.password + '&j_validate=true';

        if (config.wcm_mode !== 'EDIT' && config.wcm_mode !== 'DESIGN') {
            if (authEnabled != null && authEnabled === 'true') {
                $http({
                    method: 'POST',
                    url: serviceUrl,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function () {
                            storeProfileAndGoToNextPage(profileUrl, buttonPath);
                        })
                        .error(function (data) {
                            if (data.indexOf(ERROR_INVALID_LOGIN) >= 0) {
                                ToastService.error(formInvalidCredentials);
                            } else if (data.indexOf(ERROR_SESSION_TIMEOUT) >= 0) {
                                ToastService.error(sessionTimeout);
                            } else {
                                ToastService.error(formUnableLogin);
                            }
                        });

            } else {
                storeProfileAndGoToNextPage(profileUrl, buttonPath);
            }
        } else {
            storeProfileAndGoToNextPage(profileUrl, buttonPath);
        }
    }

    function storeProfileAndGoToNextPage(profileUrl, buttonPath) {
        AuthenticationService.getUserDetails(profileUrl).then(function (user) {

            UserService.setUser(user);

            DsAuthService.logIn(user);

            DsEventService.sessionStart(user);

        });
        goToHomePage(buttonPath);
    }
}
