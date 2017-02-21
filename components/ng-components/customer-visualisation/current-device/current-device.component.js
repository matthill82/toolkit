/**
 * @example
 *  <current-device
 *      device="{object}"
 *  ></current-device>
 */
angular.module('uitoolkit')
    .component('currentDevice', {
        bindings: {
            device: '<'
        },
        controller: function () {},
        templateUrl: '/components/ng-components/customer-visualisation/current-device/current-device.html'
    });
