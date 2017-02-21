/**
 * @example
 * <customer-average-usage></customer-average-usage>
 */
angular.module('uitoolkit')
    .component('customerAverageUsage', {
        templateUrl: '/components/ng-components/customer-average-usage/customer-average-usage.html',
        controller: 'CustomerAverageUsageController',
        bindings: {
            title: '@cauTitle',
            averageUsageWindow: '@cauAverageUsageWindow',
            propositions: '<cauPropositions',
            ctaIcon: '@cauCtaIcon',
            ctaPath: '@cauCtaPath'
        }
    });
