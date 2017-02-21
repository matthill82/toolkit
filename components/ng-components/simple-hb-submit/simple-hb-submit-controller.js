angular
    .module('uitoolkit')
    .controller('SimpleHbSubmitController', SimpleHbSubmitController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {object} EventEnums
 * @constructor
 */
function SimpleHbSubmitController($scope, EventEnums) {
    var $ctrl = this;

    $ctrl.display = true;

    $ctrl.$onInit = $onInit;
    $ctrl.submit = submit;

    function $onInit() {
        if ($ctrl.hidden === 'false') {
            $ctrl.display = false;
        }

        if (angular.isUndefined($ctrl.fallback) || $ctrl.fallback === 'false') {
            $scope.$root.$broadcast(EventEnums.ENUMS.SIMPLE_HB_SUBMIT_RENDER, true);
        } else {
            $scope.$on(EventEnums.ENUMS.SIMPLE_HB_SUBMIT_RENDER, function () {
                $ctrl.display = false;
            });
        }
    }

    function submit($event) {
        $event && $event.preventDefault();

        $scope.$root.$broadcast('submit', $ctrl.triggerEvent);
    }
}
