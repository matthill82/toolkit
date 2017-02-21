angular
    .module('uitoolkit')
    .controller('ProductCompareController', ProductCompareController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {DeviceHelperService} DeviceHelperService
 * @param {object} EventEnums
 * @param {ProductCompareService} ProductCompareService
 * @constructor
 */
function ProductCompareController($scope, DeviceHelperService, EventEnums, ProductCompareService) {
    var $ctrl = this;
    var _deviceCategoryJourneyTypeConfig = angular.fromJson($ctrl.deviceCategoryJourneyTypeConfig) || {};

    $ctrl.pending = true;

    $ctrl.$onInit = $onInit;
    $ctrl.getCategoryJourneyType = getCategoryJourneyType;
    $ctrl.removeCompare = removeCompare;
    $ctrl.select = select;
    $ctrl.selectImage = angular.noop;

    function $onInit() {
        ProductCompareService.load().then(function (products) {
            $ctrl.products = products;
            $ctrl.numberProducts = $ctrl.products.length;
        }, function () {
            $ctrl.products = [];
        }).finally(function () {
            $ctrl.pending = false;
        });
    }

    function getCategoryJourneyType(product) {
        if (angular.isDefined(product.device) &&
            angular.isDefined(_deviceCategoryJourneyTypeConfig[product.device.category1])
        ) {
            return _deviceCategoryJourneyTypeConfig[product.device.category1];
        }
    }

    function removeCompare(product) {
        $ctrl.numberProducts = $ctrl.numberProducts - 1;

        ProductCompareService.removeCompare(
            product,
            // todo Tech debt, this is nasty, rebuild to not use slick!
            $(document.getElementsByTagName('slick')[0])
        );

    }

    function select(product) {
        $scope.$root.$broadcast(EventEnums.ENUMS.SELECT_ITEM, product);

        DeviceHelperService.goToDevice(product, angular.fromJson($ctrl.deviceCategoryRedirectUrlConfig));
    }
}
