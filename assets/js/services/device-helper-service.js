angular
    .module('uitoolkit')
    .service('DeviceHelperService', DeviceHelperService);

/**
 * Common helper/utility functions for working with devices. May be refactored,
 * avoids code duplication.
 *
 * @constructor
 */
function DeviceHelperService($state, $window, StateManagement) {
    this.getCategoryRedirectUrl = getCategoryRedirectUrl;
    this.goToDevice = goToDevice;

    /**
     * @param {object} product
     * @param {object|string} categoryRedirectUrlConfig Device category1 => url map or the redirect url string.
     * @returns {?string}
     */
    function getCategoryRedirectUrl(product, categoryRedirectUrlConfig) {
        if (angular.isString(categoryRedirectUrlConfig)) {
            return categoryRedirectUrlConfig;
        }

        if (angular.isDefined(product.device) &&
            angular.isDefined(categoryRedirectUrlConfig[product.device.category1])
        ) {
            return categoryRedirectUrlConfig[product.device.category1];
        }
    }

    /**
     * @param {object} product
     * @param {object|string} categoryRedirectUrlConfig Device category1 => url map or the redirect url string.
     */
    function goToDevice(product, categoryRedirectUrlConfig) {
        StateManagement.setDevice($window.ENUMS.DEVICE_KEYS.DEVICE, product.id);
        StateManagement.setDevice($window.ENUMS.DEVICE_KEYS.PRESELECTED_DEVICE, product.id);

        $state.go(getCategoryRedirectUrl(product, categoryRedirectUrlConfig).replaceHTMLSuffix());
    }
}
