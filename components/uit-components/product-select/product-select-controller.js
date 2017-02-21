angular
    .module('uitoolkit')
    .controller('UitProductSelectController', UitProductSelectController);

function UitProductSelectController() {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        if (!angular.isFunction($ctrl.onIsSelected)) {
            $ctrl.onIsSelected = angular.noop;
        }
    }
}
