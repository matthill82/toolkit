angular
    .module('uitoolkit')
    .controller('FastTrackDeviceItemController', FastTrackDeviceItemController);

/**
 *
 * @param $state
 * @param $window
 * @param {StateManagement} StateManagement
 */
function FastTrackDeviceItemController($state, $window, StateManagement) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.goTo = goTo;

    /**
     *
     */
    function $onInit(){
        $ctrl.FastTrackDeviceContainerController.getDevice($ctrl.deviceId)
            .then(function (data) {
                $ctrl.title = data.device.manufacturer + ' ' + data.device.name;
                $ctrl.deviceImgUrl = data.device.imagery[0].url;
            });
    }

    /**
     *
     */
    function goTo() {
        StateManagement.setDevice($window.ENUMS.DEVICE_KEYS.DEVICE, $ctrl.deviceId);

        $state.go($ctrl.path.replaceHTMLSuffix());
    }
}
