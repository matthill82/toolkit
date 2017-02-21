angular.module('uitoolkit')
    .controller('BundleController', BundleController);

/**
 * @param $sce
 * @param {$rootScope.Scope} $scope
 * @param {BasketService} BasketService
 * @constructor
 */
function BundleController($sce, $scope, BasketService) {
    var $ctrl = this;
    var basket;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        basket = BasketService.getBasket();

        $ctrl.noProductSelectedTextSce = $sce.trustAsHtml($ctrl.noProductSelectedText);

        $scope.$watch(function () {
            return basket.findAttachmentsByDisplayType($ctrl.displayType)[0];
        }, function (newVal) {
            $ctrl.bundle = newVal;

            $ctrl.upsellMessageSce = $sce.trustAsHtml(_getMessage());
        });
    }

    function _getMessage() {
        if (!$ctrl.bundle || !$ctrl.bundle.upsellAddMore) {
            return '';
        }

        if ($ctrl.moreText && $ctrl.moreText.match(/\{0}/)) {
            return $ctrl.moreText.replace(/\{0}/, $ctrl.bundle.upsellAddMore);
        }

        return $ctrl.bundle.upsellAddMore;
    }
}
