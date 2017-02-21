/**
 * @example
 * <basket-builder
 *   plan-title="plan"
 *   plan-edit-label="edit"
 *   plan-full-plan-label="View full plan details"
 * ></basket-builder>
 */
angular.module('uitoolkit')
    .component('basketBuilder', {
        templateUrl: '/components/ng-components/basket-builder/basket-builder.html',
        controller: 'BasketBuilderController',
        bindings: {
            devicePropositions: '<',
            difJourneyType: '@',
            numberFeatureIcons: '@',
            deviceButtonLabel: '@',
            deviceButtonLabelActive: '@',
            deviceButtonActiveIcon: '@',
            deviceDetailsLabel: '@',
            deviceDetailsIcon: '@',
            deviceDetailsLink: '@',
            deviceNotStartedLabel: '@',
            deviceCtaLink: '@',
            deviceInProgressLabel: '@',
            deviceEditLabel: "@",
            deviceEditIcon: '@',
            deviceEditLink: '@',
            deviceImageLink: '@',
            deviceImeiLink: '@',
            planTitle: '@',
            planPerPreposition: '@',
            planEditLabel: '@',
            planFullPlanLabel: '@',
            planFeatureIcon: '@',
            planNotStartedLabel: '@',
            planInProgressLabel: '@',
            planCtaLink: '@',
            deviceDifJourneyType: '@',
            deviceNumberFeatureIcons: '@',
            planEditLink: '@',
            planEditIcon: '@',
            planFullPlanLink: '@',
            planFullPlanIcon: '@'
        }
    });
