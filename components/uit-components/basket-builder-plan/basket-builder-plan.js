/**
 * @example
 * <basket-builder-plan></basket-builder-plan>
 */
angular.module('uitoolkit')
    .component('uitBasketBuilderPlan', {
        templateUrl: '/components/uit-components/basket-builder-plan/basket-builder-plan.html',
        controller: 'UitBasketBuilderPlanController',
        bindings: {
            title: '@',
            editLabel: '@',
            fullPlanLabel: '@',
            planFeatureIcon: '@',
            notStartedLabel: '@',
            inProgressLabel: '@',
            ctaLink: '@',
            sectionType: '@',
            editLink: '@',
            editIcon: '@',
            fullPlanLink: '@',
            fullPlanIcon: '@',
            journeyType: '@',
            disabledState: '<',
            panelOpen: '<'
        }
    });
