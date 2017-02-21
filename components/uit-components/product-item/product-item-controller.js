angular
    .module('uitoolkit')
    .controller('UitProductItemController', UitProductItemController);

/**
 * @param {$rootScope.Scope} $scope
 * @param $timeout
 * @param {object} EventEnums
 * @constructor
 */
function UitProductItemController($scope, $timeout, EventEnums) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        if (!angular.isFunction($ctrl.onIsSelected)) {
            $ctrl.onIsSelected = angular.noop;
        }

        if (!angular.isFunction($ctrl.onSelectImage)) {
            $ctrl.onSelectImage = $ctrl.onSelect || angular.noop;
        }

        $timeout(function () {
            $scope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, $ctrl.product.device);
        }, 0);
    }
}
