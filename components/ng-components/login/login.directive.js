angular
    .module('uitoolkit')
    .directive('login', loginDirective);

function loginDirective() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        controller:'LoginController',
        controllerAs:'LoginController',
        templateUrl: '/components/ng-components/login/login.html',
        link: function (scope, element, attr){
            var regexstring = attr.loginUserRegexPattern; //should not contain slashes
            var pwregexstring = attr.loginPasswordRegexPattern; //should not contain slashes

            scope.backgroundImage = attr.loginBackgroundImage;
            scope.header = attr.loginHeader;
            scope.buttonLabel = attr.loginButtonLabel;
            scope.buttonPath = attr.loginButtonPath;
            scope.userPlaceholderText = attr.loginUserPlaceholderText;
            //scope.userRequiredMsg = attr.loginUserRequiredMsg;  //removed from requirements as per discussion
            scope.userRegexPattern = new RegExp(regexstring);
            scope.userRegexValidationText = attr.loginUserRegexValidationText;
            scope.passwordPlaceholderText = attr.loginPasswordPlaceholderText; //password regex now required
            //scope.passwordRequiredMsg = attr.loginPasswordRequiredMsg; //removed from requirements as per discussion
            scope.serviceUrl = attr.loginServiceUrl;
            scope.sessionTimeout = attr.loginSessionTimeout;
            scope.profileUrl = attr.loginProfileUrl;
            scope.formInvalidCredentials = attr.loginInvalidCredentials;
            scope.formUnableLogin = attr.loginUnableLogin;

            scope.passwordRegexValidationText = attr.loginPasswordRegexValidationText;
            scope.passwordRegexPattern = new RegExp(pwregexstring);
            scope.authEnabled = attr.loginAuthEnabled;
        }
    };
}
