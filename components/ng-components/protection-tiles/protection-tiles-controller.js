angular.module('uitoolkit')
    .controller('ProtectionTilesController', ProtectionTilesController);

/**
 * @param $scope
 * @param $filter
 * @param {DeviceService} DeviceService
 * @param EventEnums
 * @param {ProtectionTilesService} ProtectionTilesService
 * @param {StateManagement} StateManagement
 * @constructor
 */
function ProtectionTilesController(
    $filter,
    $scope,
    DeviceService,
    EventEnums,
    ProtectionTilesService,
    StateManagement
) {
    var $ctrl = this;

    $ctrl.modalOpen = false;
    $ctrl.modalCloseIcon = '';
    $ctrl.modalContentUrl = '';
    $ctrl.modalTitle = '';
    $ctrl.modalsize = '';

    $ctrl.openModal = function openModal(hintContent, closeIcon, modalTitle, modalSize) {
        hintContent = hintContent || '';
        $ctrl.modalContentUrl = $filter('htmlEntities')(hintContent);
        $ctrl.modalCloseIcon = closeIcon;
        $ctrl.modalTitle = modalTitle;
        $ctrl.modalOpen = true;
        $ctrl.modalsize = modalSize;
    };

    $ctrl.$onInit = function ProtectionTilesController$onInit() {
        loadProductData();

        $scope.$on(EventEnums.ENUMS.PRODUCT_OFFERINGS, function (event, data) {
            $ctrl.carePlans = ProtectionTilesService.getCarePlans(
                parseInt(data.upfrontPrice.net.value),
                $ctrl.journeyType,
                $ctrl.dataType,
                $ctrl.terms
            );
        });
    };

    /**
     * Returns device and sets it to broadcast
     */
    function loadProductData() {
        var deviceId = StateManagement.getDevice('device');

        if (deviceId !== null) {
            DeviceService.getProductDetails(deviceId)
                .then(
                    function (response) {
                        var selectedOffering;
                        var selectedDevice;
                        var results = response.queryResult;

                        results.forEach(function (result) {
                            selectedDevice = result.device;
                            selectedOffering = result.offering[0];
                            $scope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, selectedDevice);
                            $scope.$broadcast(EventEnums.ENUMS.PRODUCT_OFFERINGS, selectedOffering);
                        });
                    }
                );
        }
    }

    $ctrl.returnCorrectPricing = function returnCorrectPricing(upfrontPrice, monthlyPrice) {
        return ProtectionTilesService.getCorrectPriceForPlan(upfrontPrice, monthlyPrice);
    };

    $ctrl.isPlanSelected = function isPlanSelected(productId) {
        return ProtectionTilesService.isPlanSelected(productId);
    };

    $ctrl.selectPlan = function selectPlan(item, displayType, image, itemIndex, basketText) {
        ProtectionTilesService.addOrRemoveFromBasket(item, displayType, image, itemIndex, basketText);
    };
}
