/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
     .controller('DeviceDetailsController', DeviceDetailsController);

/**
 *
 * @param $scope
 * @param $state
 * @param DeviceRecommendationsService
 * @param DeviceService
 * @param EventEnums
 * @param StateManagement
 * @constructor
 */
function DeviceDetailsController($scope, $state, DeviceRecommendationsService, DeviceService, EventEnums, StateManagement) {
    var vm = this;

    var KEY_DEVICE = window.ENUMS.DEVICE_KEYS.DEVICE;//'device';
    var KEY_COLOUR = window.ENUMS.DEVICE_KEYS.DEVICE_COLOUR;//'deviceColour';
    var KEY_CAPACITY = window.ENUMS.DEVICE_KEYS.DEVICE_CAPACITY;//'deviceCapacity';

    var directionKeys = StateManagement.journeyGetDirectionKeys();

    vm.showLightboxFlag = false;
    vm.selectedColor = 0;
    vm.selectedCapacity = 0;
    vm.fullName = '';
    vm.featureImg = '';
    vm.selectedLightboxImageUrl = '';
    vm.selectecLightboxImageText = '';
    vm.selectColor = selectColor;
    vm.selectCapacity = selectCapacity;
    vm.isActiveColor = isActiveColor;
    vm.isActiveCapacity = isActiveCapacity;
    vm.saveDevice = saveDevice;
    vm.isNoImageryToDisplay = isNoImageryToDisplay;
    vm.isNoKeyFeaturesToDisplay = isNoKeyFeaturesToDisplay;
    vm.isNoDeviceToDisplay = isNoDeviceToDisplay;
    vm.openLightbox = openLightbox;
    vm.showLightbox = showLightbox;
    vm.cancelLightbox = cancelLightbox;
    vm.backDropClicked = backDropClicked;
    vm.capacitiesIsOneOrLess = capacitiesIsOneOrLess;
    vm.capacitiesExists = capacitiesExists;
    vm.deviceHasCapacity = deviceHasCapacity;
    vm.nextImage = nextImage;
    vm.shortenText = shortenText;
    vm.addToBasket = addToBasket;

    loadProductData();

    $scope.$on(window.ENUMS.EVENTS.RECEIVE.RELOAD_DEVICE_DATA, function () {
        loadProductData();
    });


    function shortenText(string, maxLengthSt, cutoffSymbol) {
        var newString = string;
        var maxLength = parseInt(maxLengthSt);

        var strLength = string.length;
        if (strLength > maxLength) {
            var splitted = string.substring(0, maxLength);
            newString = splitted + cutoffSymbol;
        }

        return newString;
    }


    function isActiveCapacity(index) {
        return vm.selectedCapacity === index;
    }

    function isActiveColor(index) {
        return vm.selectedColor === index;
    }

    function backDropClicked() {
        cancelLightbox();
    }

    function saveDevice(device, link, actionMode) {

        var colourname = vm.device.available_colours[vm.selectedColor].name;
        var capacityname = null;

        if (typeof vm.device.available_capacities === 'undefined') {
            if (typeof vm.device.capacity !== 'undefined') {
                var cap = vm.device.capacity;
                if (cap.length > 0) {
                    if (vm.device.capacity[0].amount !== 0) {
                        capacityname = vm.device.capacity[0].amount + vm.device.capacity[0].unit;
                    } else {
                        capacityname = null;
                    }
                } else {
                    capacityname = null;
                }
            }
        } else {
            capacityname = vm.device.available_capacities[vm.selectedCapacity].amount + vm.device.available_capacities[vm.selectedCapacity].unit;
        }

        StateManagement.setDevice(KEY_DEVICE, device);
        StateManagement.saveData(KEY_COLOUR, colourname);
        StateManagement.saveData(KEY_CAPACITY, capacityname);

        if (actionMode === 'broadcast') {
            $scope.$root.$broadcast(EventEnums.ENUMS.SELECT_DEVICE, {
                hBPropositionDevice: angular.copy(vm.proposition.device),
                hBSelectedColor: angular.copy(vm.selectedColor),
                hBfFullName: angular.copy(vm.fullName)
            });
        } else if (link){
            $state.go(link.replaceHTMLSuffix());
        }
    }

    function addToBasket(proposition, link) {
         StateManagement.journeySetDirection(directionKeys.NEXT);
         DeviceRecommendationsService.addToBasket(proposition);
         StateManagement.setDevice(KEY_DEVICE, proposition.device.id);
         link = link.replaceHTMLSuffix();
         $state.go(link);
     }


    function selectCapacity(index) {
        vm.selectedCapacity = index;
        getFullProductName();
    }

    function isNoImageryToDisplay(imagery) {
        var isNoImagery = true;
        if (imagery !== undefined) {
            if (imagery.length >= 0) {
                isNoImagery = false;
            }
        }
        return isNoImagery;
    }

    function isNoDeviceToDisplay(devices) {
        var isNoDeviceToDisplayList = true;
        if (devices != null) {
            if (devices.length >= 0) {
                isNoDeviceToDisplayList = false;
            }
        }
        return isNoDeviceToDisplayList;
    }

    function isNoKeyFeaturesToDisplay(features) {
        var isNoFeatureList = true;
        if (features != null) {
            if (features.length >= 0) {
                isNoFeatureList = false;
            }
        }
        return isNoFeatureList;
    }

    function openLightbox(imageUrl, imageDescription, index) {
        vm.selectedLightboxImageUrl = imageUrl;
        vm.selectecLightboxImageText = imageDescription;
        vm.showLightboxFlag = true;
        vm.selected = index;

    }

    function proportionalResize() {
//                   var img = document.getElementById('detail-image-'+$scope.selected); 
//or however you get a handle to the IMG
//var width = img.clientWidth;
//var height = img.clientHeight;
//console.log(width,height);
    }

    function nextImage($event, inc) {
        var nxt = vm.selected + inc;
        if (inc === 0) {
            //  var ctl =angular.element($event.currentTarget);//document.getElementByClassName('.modal-body');
            var bodyWidth = document.getElementsByTagName('body')[0].scrollWidth;
            nxt = vm.selected - 1;
            if ($event.x > bodyWidth / 2) {
                nxt = vm.selected + 1;
            }
        }
        if (nxt > vm.device.imagery.length - 1) {
            nxt = 0;
        }
        if (nxt < 0) {
            nxt = vm.device.imagery.length - 1;
        }
        var image = vm.device.imagery[nxt];
        proportionalResize();
        openLightbox(image.url, image.description, nxt)

    }

    function cancelLightbox() {
        vm.showLightboxFlag = false;
        return vm.showLightboxFlag;
    }

    function showLightbox() {
        return vm.showLightboxFlag;
    }

    function selectColor(index) {
        var selectedColorObj = vm.device.available_colours[index];
        if (selectedColorObj.imagery.length > 0) {
            vm.featureImg = selectedColorObj.imagery[0].url;
            vm.device.imagery=selectedColorObj.imagery;
        }

        vm.selectedColor = index;

        getFullProductName();
    }


    function capacitiesIsOneOrLess() {
        if (typeof vm.device.available_capacities === 'undefined') {
            return true;
        } else {
            if (vm.device.available_capacities.length <= 1) {
                return true;
            } else {
                return false;
            }
        }
    }


    function capacitiesExists() {
        if (typeof vm.device !== 'undefined') {
            if (typeof vm.device.available_capacities === 'undefined') {
                return false;
            } else {
                return true;
            }
        }
    }


    function deviceHasCapacity() {
        if (typeof vm.device !== 'undefined') {
            if (typeof vm.device.capacity === 'undefined') {
                return false;
            } else {
                if (vm.device.capacity.length !== 0) {
                    if (typeof vm.device.capacity[0] !== 'undefined') {
                        if (vm.device.capacity[0].amount === 0) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    }


    function applyData(proposition) {
        vm.device = proposition.device;
        vm.proposition = proposition;
        if (typeof vm.device !== 'undefined') {
            if (typeof vm.device.available_colours !== 'undefined') {
                if (vm.device.available_colours.length > 0) {
                    var selectedColor = vm.device.available_colours[0];
                    if (StateManagement.getData(KEY_COLOUR)) {
                        var old_color = StateManagement.getData(KEY_COLOUR)
                        var regexp = /^"?(.+?)"?$/;
                        old_color = old_color.replace(regexp, '$1');
                        vm.device.available_colours.forEach(function (col, ind) {
                            if (old_color === col.name) {
                                selectedColor = col;
                                vm.selectedColor = ind;
                            }
                        });
                    }
                    if (selectedColor.imagery.length > 0) {
                        vm.featureImg = selectedColor.imagery[0].url;
                         vm.device.imagery=selectedColor.imagery;
                    }
                }

            }
        }


        getFullProductName();
    }

    function getFullProductName() {

        if (typeof(vm.device) !== 'undefined') {
            vm.fullName = vm.device.manufacturer + ' ' + vm.device.name + ' ' + vm.device.available_colours[vm.selectedColor].name;

            if (typeof vm.device.available_capacities !== 'undefined') {
                vm.fullName = vm.device.manufacturer + ' ' + vm.device.name + ' ' + vm.device.available_colours[vm.selectedColor].name + ' ' + vm.device.available_capacities[vm.selectedCapacity].amount + vm.device.available_capacities[vm.selectedCapacity].unit;
            }
        }

        vm.productNameLoaded = true;
    }




    function loadProductData() {
        var deviceId = StateManagement.getDevice('device');

        if (deviceId !== null) {
            DeviceService.getProductDetails(deviceId)
                .then(
                    function (response) {
                        var selectedOffering;
                        var selectedDevice;
                        var proposition = {};
                        var results = response.queryResult;

                        results.forEach(function (result) {
                            selectedDevice = result.device;
                            selectedOffering = result.offering[0];
                            proposition = result;

                            $scope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, selectedDevice);
                            $scope.$broadcast(EventEnums.ENUMS.PRODUCT_OFFERINGS, selectedOffering);
                        });

                        applyData(proposition);
                    }
                );
        }
    }
}
