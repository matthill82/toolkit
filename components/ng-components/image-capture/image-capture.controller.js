/* global cordova:true */
angular
    .module('uitoolkit')
    .controller('ImageCaptureController', ImageCaptureController);

/**
 * @param {$document} $document
 * @param {$log} $log
 * @param {$rootScope.Scope} $scope
 * @param {ConfigService} ConfigService
 * @param {ToastService} ToastService
 */
function ImageCaptureController($document, $log, $scope, ConfigService, ToastService) {

    var contentConfig = ConfigService.get('image-capture');
    var quality = contentConfig.imageQuality;
    var imageMimeType = contentConfig.imageMimeType;
    var $ctrl = this;

    $ctrl.captureImage = captureImage;
    $ctrl.imgUrl = contentConfig.imgUrl;
    //hardcoding to 1 for current requirements
    $ctrl.options = {limit:1};

    function captureImage() {
        var i;
        var path;
        var len;

        if (angular.isUndefined(cordova)){
            ToastService.show('info', contentConfig.noTouchToastTitle, contentConfig.noTouchToastText);
        }
        else {
            navigator.device.capture.captureImage(function (mediaFiles){
                //success callback
                $log.info('Cordova Media Files ', mediaFiles);

                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;

                    toBase64URL(path, function (base64Url){
                        $scope.$apply(function () {
                            $ctrl.model = base64Url;
                        });
                    });
                }
            },function (){
                    //error callback
                ToastService.show('info', contentConfig.scanErrorToastTitle, contentConfig.scanErrorToastText);
            }, $ctrl.options);
        }
    }

    function toBase64URL(src, callback) {
        var img = new Image();

        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = $document[0].createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var base64URL;

            canvas.height = $ctrl.height;
            canvas.width = $ctrl.width;
            ctx.drawImage($ctrl, 0, 0);
            // Convert the canvas to a data url
            base64URL = canvas.toDataURL(imageMimeType, quality);
            callback(base64URL);
            //ready for GC
            canvas = null;
        };
        img.src = src;
        // make sure the load event fires for cached images too
        if (img.complete || angular.isUndefined(img.complete)) {
            // Flush cache with random image
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
            img.src = src;
        }
    }
}
