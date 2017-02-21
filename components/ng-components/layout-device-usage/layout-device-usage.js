/**
 * @example
 * <layout-device-usage
 *      title="">
 *     </layout-device-usage>
 */
angular.module('uitoolkit')
    .component('layoutDeviceUsage', {
        templateUrl: '/components/ng-components/layout-device-usage/layout-device-usage.html',
        bindings: {
            data: '<',
            orientation: '@'
        }
    });
