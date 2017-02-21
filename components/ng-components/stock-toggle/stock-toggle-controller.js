angular
    .module('uitoolkit')
    .controller('StockToggleController', StockToggleController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {object} EventEnums
 * @param {StateManagement} StateManagement
 * @constructor
 */
function StockToggleController($scope, EventEnums, StateManagement) {
    var $ctrl = this;

    $ctrl.toggledOn = StateManagement.get('showInStore');

    $ctrl.switchToggle = switchToggle;

    // If it has not yet been set then default to true.
    if ($ctrl.toggledOn === null) {
        $ctrl.toggledOn = true;
    }

    switchToggle();

    function switchToggle() {
        StateManagement.set('showInStore', $ctrl.toggledOn);

        $scope.$root.$broadcast(EventEnums.ENUMS.STOCK_TOGGLE, {showInStore: $ctrl.toggledOn});
    }
}
