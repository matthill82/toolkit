angular.module('uitoolkit')
    .service('DeviceCompareService', DeviceCompareService);

/**
 * @param $q
 * @param {$rootScope.Scope} $rootScope
 * @param {DeviceService} DeviceService
 * @param {StateManagement} StateManagement
 * @constructor
 */
function DeviceCompareService($q, $rootScope, DeviceService, StateManagement) {
    var COMPARE_BASKET = 'compareBasket';

    this.addRemoveCompare = addRemoveCompare;
    this.getCompare = getCompare;
    this.getCompareDevices = getCompareDevices;
    this.isInCompare = isInCompare;
    this.removeCompare = removeCompare;

    function addRemoveCompare(deviceId) {
        var compare = StateManagement.getCompareBasket(COMPARE_BASKET);
        var isAlreadyInCompare = false;
        var i = 0;
        var item;

        if (deviceId) {
            if (compare !== null) {
                for (; i < compare.length; i++) {
                    item = compare[i];
                    if (item.contains(deviceId)) {
                        isAlreadyInCompare = true;
                        StateManagement.removeCompareBasketItem(COMPARE_BASKET, deviceId);
                        updateCompare(compare.length - 1);
                    }
                }
                if (isAlreadyInCompare === false) {
                    StateManagement.setCompareBasketItem(COMPARE_BASKET, deviceId);
                    updateCompare(compare.length + 1);
                }
            } else {
                StateManagement.setCompareBasketItem(COMPARE_BASKET, deviceId);
                updateCompare(1);
            }
        }
    }

    function removeCompare(deviceId, e) {

        StateManagement.removeCompareBasketItem(COMPARE_BASKET, deviceId);
        if (e) {
            e.currentTarget.closest('.slick-slide').remove();
        }
        // This nastiness relates to the compare counter in the navigation.
        $rootScope.numberCompareItems--;

    }


    function getCompare(className, deviceId) {
        var containsItem = false;
        var compare = StateManagement.getData(COMPARE_BASKET);
        var compareArray;

        if (compare !== null) {
            compareArray = compare.split(',');

            if (compareArray !== null) {

                if (compareArray.indexOf(deviceId) > -1) {
                    containsItem = true;
                }
            }
        }
        if (containsItem) {
            return className;
        }
    }

    /**
     * @param {string} deviceId
     * @returns {boolean}
     */
    function isInCompare(deviceId) {
        var compare = StateManagement.getData(COMPARE_BASKET);

        if (compare) {
            compare = compare.split(',');
        }

        return compare && compare.length > 0 && compare.indexOf(deviceId) > -1;
    }

    function updateCompare(compare) {
        // This nastiness relates to the compare counter in the navigation.
        if (compare !== null) {
            $rootScope.numberCompareItems = compare;
        } else {
            $rootScope.numberCompareItems = 1;
        }
    }

    function getCompareDevices() {
        var compareBasketIds = StateManagement.getCompareBasket(COMPARE_BASKET);

        if (compareBasketIds != null) {
            return DeviceService.findByIds(compareBasketIds).then(function (result) {
                if (!result.queryResult.length) {
                    return $q.reject('No Results');
                }

                return result.queryResult;
            });
        }

        return $q.reject('Compare Basket Empty');
    }
}
