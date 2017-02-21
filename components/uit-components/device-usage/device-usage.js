/**
 * @example
 * <uit-device-usage
 *      title="">
 *     </uit-device-usage>
 */
angular.module('uitoolkit')
    .component('uitDeviceUsage', {
        templateUrl: '/components/uit-components/device-usage/device-usage.html',
        bindings: {
            data: '<',
            orientation: '@'
        }
    });
