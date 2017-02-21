angular
    .module('uitoolkit')
    .controller('SimpleHbUnhandledController', SimpleHbUnhandledController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {UtilityService} UtilityService
 */
function SimpleHbUnhandledController($scope, UtilityService) {
    var $ctrl = this;

    $ctrl.getUnhandled = function () {
        return UtilityService.findUpScope($scope, 'unhandled');
    };
}
