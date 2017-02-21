angular
    .module('uitoolkit')
    .controller('DeviceCompareController', DeviceCompareController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {DeviceCompareService} DeviceCompareService
 * @param EventEnums
 * @constructor
 */
function DeviceCompareController($scope, DeviceCompareService, EventEnums) {
    var $ctrl = this;
    var deviceId = '';

    $ctrl.$onInit = $onInit;
    $ctrl.addRemoveCompare = addRemoveCompare;
    $ctrl.isInCompare = isInCompare;
    $ctrl.removeCompare = removeCompare;

    $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
        deviceId = data.id;
    });

    function $onInit() {
        if ($ctrl.device) {
            deviceId = $ctrl.device.id;
        }
    }

    function addRemoveCompare() {
        return DeviceCompareService.addRemoveCompare(deviceId);
    }

    function isInCompare() {
        return DeviceCompareService.isInCompare(deviceId);
    }

    function removeCompare($event) {
        return DeviceCompareService.removeCompare(deviceId, $event);
    }
}
