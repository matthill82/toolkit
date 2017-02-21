angular.module('uitoolkit').controller('FastTrackDeviceContainerController', FastTrackDeviceContainerController);

/**
 *
 * @param $q
 * @param {$rootScope.Scope} $scope
 * @param {DeviceService} DeviceService
 * @constructor
 */
function FastTrackDeviceContainerController($q, $scope, DeviceService) {
    var $ctrl = this;
    var deviceIds = [];
    var devicePromises = {};
    var loaded = false;

    $ctrl.getDevice = getDevice;


    /**
     *
     * @param deviceId
     */
    function getDevice(deviceId) {
        deviceIds.push(deviceId);
        devicePromises[deviceId] = $q.defer();

        if (!loaded) {
            loaded = true;
            $scope.$evalAsync(function () {
                _loadDevices();
            });
        }

        return devicePromises[deviceId].promise;
    }

    /**
     *
     * @private
     */
    function _loadDevices() {
        DeviceService.findProductsByName(deviceIds).then(function (data) {
            var buckets = data.aggregations.devices.buckets;
            var deviceId;
            var i;

            if (buckets.length) {
                $ctrl.componentVisible = true;

                for (i = 0; i < buckets.length; i++) {
                    deviceId = buckets[i].item.hits.hits[0]._source.device.id;

                    devicePromises[deviceId].resolve(buckets[i].item.hits.hits[0]._source);

                    deviceIds.splice(deviceIds.indexOf(deviceId), 1);
                }
            }

            // Reject promises for unresolved devices
            deviceIds.map(function (deviceId){
                devicePromises[deviceId].reject();
            });
        });
    }
}
