angular
    .module('uitoolkit')
    .controller('SelectedDeviceThumbnailController', SelectedDeviceThumbnailController);

/**
 *
 * @param {DeviceService} DeviceService
 * @param {ImageService} ImageService
 * @param {StateManagement} StateManagement
 * @constructor
 */
function SelectedDeviceThumbnailController(DeviceService, ImageService, StateManagement) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        var deviceId = StateManagement.getDevice('device');

        if (deviceId) {
            DeviceService.getProductDetailsCached(deviceId)
                .then(function (data) {
                    var proposition;

                    if (data.length) {
                        proposition = data[0];

                        $ctrl.showComponent = true;
                        $ctrl.manufacturer = proposition.device.manufacturer;
                        $ctrl.name = proposition.device.name;
                        $ctrl.imgSrc = ImageService.findImageUrlBySize(proposition.device.imagery, $ctrl.imageSize);
                    }
                });
        }
    }
}
