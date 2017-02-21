angular
    .module('uitoolkit')
    .controller('PricingController', PricingController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {ConfigService} ConfigService
 * @param {object} EventEnums
 * @constructor
 */
function PricingController($scope, ConfigService, EventEnums) {
    var $ctrl = this;

    $ctrl.config = ConfigService.get('pricing');

    $ctrl.$onInit = function () {
        if ($ctrl.device && $ctrl.offering) {
            getTradeinCashback($ctrl.device.features);
        } else {
            $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
                $ctrl.device = $ctrl.device || data;
                if (angular.isDefined($ctrl.device)) {
                    getTradeinCashback($ctrl.device.features);
                }
            });

            $scope.$on(EventEnums.ENUMS.PRODUCT_OFFERINGS, function (event, data) {
                $ctrl.offering = $ctrl.offering || data;
            });
        }
    };

    function getTradeinCashback(features) {
        var i;

        for (i = 0; i < features.length; i ++) {
            if (features[i].name === $ctrl.config.cashBackFeatureName) {
                $ctrl.cashBack = parseInt(features[i].value) || 0;
            } else if (features[i].name === $ctrl.config.tradeInFeatureName) {
                $ctrl.tradeIn = parseInt(features[i].value) || 0;
            }
        }
    }
}
