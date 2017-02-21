/**
 * @example
 * <customer-plan></customer-plan>
 */
angular.module('uitoolkit')
    .component('customerPlan', {
        templateUrl: '/components/ng-components/customer-plan/customer-plan.html',
        controller: 'CustomerPlanController',
        bindings: {
            title: '@cpTitle',
            featuresIcon: '@cpFeaturesIcon',
            propositions: '<cpPropositions'
        }
    });
