angular
    .module('uitoolkit')
    .controller('BasketSummaryController', BasketSummaryController);

/**
 * @param {$rootScope.Scope} $rootScope
 * @param {BasketService} BasketService
 * @param EventEnums
 * @param $state
 * @param $scope
 * @param ToastService
 * @param ConfigService
 * @param $sce
 * @constructor
 */
function BasketSummaryController($rootScope, BasketService, EventEnums, $state, $scope, ToastService, ConfigService, $sce) {
    var $ctrl = this;
    $ctrl.newBasket = [];
    $ctrl.$onInit = BasketSummary$onInit;
    $ctrl.$onChanges = $onChanges;
    $ctrl.checkForImei = checkForImei;
    $ctrl.checkout = BasketSummaryCheckout;

    function BasketSummary$onInit() {

        $ctrl.basket = BasketService.getBasket();

        $ctrl.config = ConfigService.get('priceFormat');
        $ctrl.currencySymbol = $sce.trustAsHtml($ctrl.config.currencySymbol);

        if ($ctrl.advanced && $ctrl.basket) {
            $ctrl.newBasket[0] = $ctrl.basket.findPropositionsWithUpfront()[0];
            if ($ctrl.newBasket[1]) $ctrl.newBasket[1] = $ctrl.basket.findPropositionsWithRecurring()[0];
        }

        $ctrl.modalOpen = false;
    }

    function $onChanges(changes) {
        if (changes.advanced && $ctrl.advanced) {
            $ctrl.templateUrl = '/components/ng-components/basket-summary/basket-summary-advanced.html';
        } else {
            $ctrl.templateUrl = '/components/ng-components/basket-summary/basket-summary.html';
        }
    }

    /**
     * @desc directs the state to a path
     * @param link
     */
    function goToButtonState(link) {
        link = link.replaceHTMLSuffix();
        $state.go(link);
    }

    /**
     * @desc checks to see if imei has been scanned
     */
    function checkForImei() {

        $ctrl.checkForScanningProperty = $ctrl.basket.filter(function (prop) {
            return (prop.imeiFlag === true || prop.imeiFlag === 'true');
        });

        if (!$ctrl.checkForScanningProperty) {
            $scope.$root.$broadcast(EventEnums.BASKET_BUILDER_RESIZE, 'device');
            ToastService.error('IMEI Scan Error', 'IMEI needs to be scanned before checkout.', {timeOut: 2000});
        } else {
            goToButtonState($ctrl.buttonPath);
            $scope.$root.$broadcast(EventEnums.ENUMS.BASKET_SUMMARY_MODAL_OPEN, $ctrl.basket);
        }
    }

    function BasketSummaryCheckout() {
        $ctrl.modalOpen = true;
        $rootScope.$broadcast(EventEnums.ENUMS.BASKET_SUMMARY_MODAL_OPEN, $ctrl.basket);
    }
}
