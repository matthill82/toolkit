angular
    .module('uitoolkit')
    .controller('UitPriceFormatController', UitPriceFormatController);

/**
 * @param {$sce} $sce
 * @param {ConfigService} ConfigService
 * @constructor
 */
function UitPriceFormatController($sce, ConfigService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        $ctrl.number = $ctrl.number || 0;
        $ctrl.config = ConfigService.get('priceFormat');
        $ctrl.currencySymbol = $sce.trustAsHtml($ctrl.config.currencySymbol);
    }
}
