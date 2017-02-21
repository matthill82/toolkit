/* global cordova:true */
angular
    .module('uitoolkit')
    .controller('BarcodeScannerFieldController', BarcodeScannerFieldController);

/**
 * @param {$log} $log
 * @param {$rootScope.Scope} $scope
 * @param {$window} $window
 * @param {ToastService} ToastService
 * @param {ConfigService} ConfigService
 */
function BarcodeScannerFieldController($log, $scope, $window, ConfigService, ToastService) {
    var $ctrl = this;
    var contentConfig = ConfigService.get('barcode-scanner');

    $ctrl.imgUrl = contentConfig.imgUrl;
    $ctrl.scanBarcode = scanBarcode;
    $ctrl.$onInit = $onInit;

    function $onInit(){

        $ctrl.options = {
            'preferFrontCamera' : contentConfig.preferFrontCamera, // iOS and Android
            'showFlipCameraButton' : contentConfig.showFlipCameraButton, // iOS and Android
            'showTorchButton' : contentConfig.showTorchButton, // iOS and Android
            'disableAnimations' : contentConfig.iOSDisableAnimations, // iOS
            'prompt' : contentConfig.androidCameraPrompt, // supported on Android only
            'formats' : contentConfig.barcodeFormats, // default: all but PDF_417 and RSS_EXPANDED
            'orientation' : contentConfig.cameraOrientation // Android only (portrait|landscape), default unset so it rotates with the device
        };
    }

    function scanBarcode() {

        if (angular.isUndefined($window.cordova)){
            ToastService.show('info', contentConfig.noTouchToastTitle, contentConfig.noTouchToastText);

            if (angular.isDefined(contentConfig.defaultModelValue)) {
                $ctrl.model = contentConfig.defaultModelValue;
                //$ctrl.model = applyRegex("0001060000163969");
            }
        }
        else {
            cordova.plugins.barcodeScanner.scan(function (result){
                //success callback
                $log.info('Cordova Barcode Payload ', result);

                $scope.$apply(function () {
                    $ctrl.model =applyRegex(result.text);
                });

            },function (){
                //error callback
                ToastService.show('info', contentConfig.scanErrorToastTitle, contentConfig.scanErrorToastText);
            },
            $ctrl.options);
        }
    }

    function applyRegex(value)  {
        var regex;
        var newValue;

        if(angular.isDefined(contentConfig.barcodeRegex)){
            regex = new RegExp(contentConfig.barcodeRegex);
            newValue = regex.exec(value);
            //make sure it's not null
            if(newValue){
                return newValue[0];
            }
        }

        return value;
    }
}
