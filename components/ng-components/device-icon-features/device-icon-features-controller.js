angular
    .module('uitoolkit')
    .controller('DeviceIconFeaturesController', DeviceIconFeaturesController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {DeviceIconFeaturesService} DeviceIconFeaturesService
 * @param {DeviceService} DeviceService
 * @param {object} EventEnums
 * @param {StateManagement} StateManagement
 * @param {UtilityService} UtilityService
 * @constructor
 */
function DeviceIconFeaturesController(
    $scope,
    DeviceIconFeaturesService,
    DeviceService,
    EventEnums,
    StateManagement,
    UtilityService
) {
    var $ctrl = this;
    var rows = parseInt($ctrl.display);

    $ctrl.$onInit = $onInit;
    $ctrl.getDisplayType = getDisplayType;
    $ctrl.getGridColumnSize = getGridColumnSize;

    function $onInit() {
        $ctrl.align = $ctrl.align || 'left';
        $ctrl.numberFeatureIcons = $ctrl.numberFeatureIcons || 6;
        $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
            $ctrl.device = $ctrl.device || data;

            if (angular.isUndefined($ctrl.device)) {
                _loadProductData(StateManagement.getDevice('device'));
            }

            $ctrl.mappings = DeviceIconFeaturesService.constructMappingData(
                $ctrl.journeyType,
                $ctrl.device,
                UtilityService.aemMapListValuesString($ctrl.featureList, ['featureCategory', 'featureName'])
            );

            $ctrl.chunkedMappings = DeviceIconFeaturesService.getChunkedMappingsForRows(
                $ctrl.mappings,
                $ctrl.numberFeatureIcons,
                rows
            );
        });
    }

    function getDisplayType() {
        return rows;
    }

    function getGridColumnSize() {

        return 100 / Math.ceil($ctrl.numberFeatureIcons / rows);
    }

    /**
     * Returns device and sets it to broadcast
     */
    function _loadProductData(deviceId) {
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
}
