angular
    .module('uitoolkit')
    .controller('BasketBuilderController', BasketBuilderController);

function BasketBuilderController($scope, EventEnums, BasketService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        $ctrl.panelOpen = 'device';
        $ctrl.planDisabledState = BasketService
                .getBasket()
                .findPropositionsWithDevices()
                .length === 0;
    }

    $scope.$on(EventEnums.BASKET_BUILDER_RESIZE, function (event, panel) {
        $ctrl.panelOpen = panel;
    });
}
