/**
 * @example
 *
 * <customer-device></customer-device>
 */
angular.module('uitoolkit')
    .component('customerDevice', {
        templateUrl: '/components/ng-components/customer-device/customer-device.html',
        controller: 'CustomerDeviceController',
        bindings: {
            title: '@cdTitle',
            upgradeMessages: '<cdUpgradeMessages',
            upgradeWindow: '@cdUpgradeWindow',
            propositions: '<cdPropositions'
        }
    });
