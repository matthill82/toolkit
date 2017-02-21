angular
    .module('uitoolkit')
    .controller('UitBasketBuilderPlanController', UitBasketBuilderPlanController);

function UitBasketBuilderPlanController($scope,
                                        $window,
                                        $state,
                                        BasketService,
                                        ConfigService,
                                        DeviceUsageService,
                                        BasketBuilderPlanService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.$onChanges = $onChanges;
    $ctrl.goTo = goTo;
    $ctrl.panelName = 'plan';

    function $onInit() {
        getTariffData();
    }

    function getTariffData() {
        var propositions = BasketService.getBasket().findPropositionsWithTariffs();

        if (propositions.length) {
            tariffExists(propositions);
        }
    }

    function tariffExists (propositions) {
        $ctrl.tariffProposition = propositions[0].data;
        $ctrl.selectedOffering = propositions[0].selectedOffering;
        $ctrl.deviceUsage = getDeviceDataList();
        if ($ctrl.selectedOffering.offeringType)
            $ctrl.contractLabel = BasketBuilderPlanService.getOfferingType($ctrl.selectedOffering.offeringType, $ctrl.journeyType);
    }

    function $onChanges() {
        $ctrl.detailsLimit = $ctrl.panelOpen === $ctrl.panelName ? 4 : 2;
        $ctrl.expand = $ctrl.panelOpen === $ctrl.panelName;
    }

    $ctrl.handleClick = function ($event) {
        if (!$ctrl.expand) {
            $scope.$root.$broadcast($window.ENUMS.EVENTS.EMIT.BASKET_BUILDER_RESIZE, $ctrl.panelName);
        } else {
            $event.stopPropagation();
        }
    };

    function getDeviceDataList() {
        var planDetails = ConfigService.get('data-points');
        if (!$ctrl.tariffProposition.tariff) return [];
        return DeviceUsageService.getDeviceDataList(planDetails,  $ctrl.tariffProposition.tariff, ['text', 'talk']);
    }

    function goTo(route) {
        $state.go(route.replaceHTMLSuffix());
    }

}
