angular.module('uitoolkit')
    .controller('DeviceImageController', DeviceImageController);


/**
 * @constructor
 * @param $scope
 * @param {ImageService} ImageService
 */
function DeviceImageController($scope, ImageService) {
    var $ctrl = this;

    $ctrl.getImageUrl = getImageUrl;

    function getImageUrl(){
        
        return ImageService.findImageUrlBySize($scope.$parent.dd.device.imagery, $ctrl.size);

    }

}
