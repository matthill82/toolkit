angular
    .module('uitoolkit')
    .controller('ProductImageController', ProductImageController);

/**
 * @param {DeviceService} DeviceService
 * @param {ImageService} ImageService
 * @constructor
 */
function ProductImageController(DeviceService, ImageService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        DeviceService.getProductDetailsCached($ctrl.deviceId).then(function (results) {
            $ctrl.image = ImageService.findDeviceImage(
                results[0].device,
                parseInt($ctrl.imageIndex),
                $ctrl.colourIndex
            );
        });
    }
}
