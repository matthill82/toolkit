angular
    .module('uitoolkit')
    .controller('DeviceTileController', DeviceTileController);

function DeviceTileController($window, DeviceService, StateManagement) {
    var $ctrl = this;
    var KEY_DEVICE = $window.ENUMS.DEVICE_KEYS.DEVICE;
    var KEY_COLOUR = $window.ENUMS.DEVICE_KEYS.DEVICE_COLOUR;
    var KEY_CAPACITY = $window.ENUMS.DEVICE_KEYS.DEVICE_CAPACITY;

    $ctrl.loadSavedDevice = loadSavedDevice;
    $ctrl.imagePath = '';
    $ctrl.colourName = '';
    $ctrl.capacity = '';

    loadSavedDevice();

    function applyData(product) {
        var colourIndex;
        var capacityIndex;
        var colourNameSaved = StateManagement.getData(KEY_COLOUR);
        var capacitySaved;

        $ctrl.deviceObj = product;

        colourIndex = getIndexOfSavedColour(colourNameSaved);
        $ctrl.colour = colourIndex;

        if ($ctrl.colour !== null
            && angular.isDefined($ctrl.deviceObj.available_colours)
        ) {
            $ctrl.imagePath = $ctrl.deviceObj.available_colours[colourIndex].imagery[0].url;
            $ctrl.colourName = $ctrl.deviceObj.available_colours[colourIndex].name;
        }

        capacitySaved = StateManagement.getData(KEY_CAPACITY);
        capacityIndex = getIndexOfSavedCapacity(capacitySaved);
        if (capacityIndex !== null
            && angular.isDefined($ctrl.deviceObj.capacity)
        ) {
            $ctrl.capacity = $ctrl.deviceObj.capacity[capacityIndex].amount
                + $ctrl.deviceObj.capacity[capacityIndex].unit;
        }
    }

    //can't test the below until we have available_capacities
    function getIndexOfSavedCapacity(capacitySavedStr) {
        var regexp = /^"?(.+?)"?$/;
        var capacitySaved = capacitySavedStr.replace(regexp,'$1');
        var i;
        var capItem;

        if (angular.isDefined($ctrl.deviceObj.capacity)) {
            for (i = 0; i < $ctrl.deviceObj.capacity.length; i++) {
                capItem = $ctrl.deviceObj.capacity[i].amount;

                if (capacitySaved.indexOf(capItem) >= 0) {
                    return i;
                }
            }
        }
    }

    function getIndexOfSavedColour(colourNameSavedStr) {
        var regexp = /^"?(.+?)"?$/;
        var colourNameSaved = colourNameSavedStr.replace(regexp,'$1');
        var i;
        var colourItem;

        if (typeof $ctrl.deviceObj.available_colours !== 'undefined') {
            for (i = 0; i < $ctrl.deviceObj.available_colours.length; i++) {
                colourItem = $ctrl.deviceObj.available_colours[i].name;
                if (colourItem.indexOf(colourNameSaved) >= 0) {
                    return i;
                }
            }
        }
    }

    function loadSavedDevice() {
        var device = StateManagement.getDevice(KEY_DEVICE);

        DeviceService.getProductDetails(device)
            .then(
                function (response) {
                    var selectedDevice;
                    var results = response.queryResult;

                    results.forEach(function (result){
                        selectedDevice = result.device;
                    });
                    applyData(selectedDevice);
                }
            );
    }
}
