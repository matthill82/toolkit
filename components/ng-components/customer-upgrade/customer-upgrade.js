/**
 * @example
 * <customer-upgrade></customer-upgrade>
 */
angular.module('uitoolkit')
    .component('customerUpgrade', {
        templateUrl: '/components/ng-components/customer-upgrade/customer-upgrade.html',
        controller: 'CustomerUpgradeController',
        bindings: {
            upgradeMessages: '<cuUpgradeMessages',
            upgradeWindow: '@cuUpgradeWindow',
            propositions: '<cuPropositions'
        }
    });
