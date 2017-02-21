angular.module('uitoolkit')
    .component('recommendedPlan', {
        bindings: {
            messagePosition: '<',
            itemIndex: '<',
            item: '<',
            url: '<',
            contentPropositions: '<',
            propositions: '<',

            downsellPlan: '<',
            upsell1: '<',
            upsell2: '<',
            upsellOther: '<',
            recommendedPlan: '<',

            sellTextUpsell1: '<',
            sellTextUpsell2: '<',
            sellTextUpsellOther: '<',
            sellTextDownsell: '<',
            sellTextBestMatch: '<',

            monthlyCostLabel: '<',
            upfrontCostLabel: '<',
            freeLabel: '<',
            benefitIcon: '<',
            talkLabel: '<',
            textLabel: '<',
            talkPointsColor: '<',
            talkPoints: '<',
            textPoints: '<',
            textPointsColor: '<',
            labelData: '<',
            pointsData: '<',
            pointsDataColor: '<',
            unlimitedText: '<'
        },
        restrict: 'E',
        templateUrl: '/components/ng-components/recommended-plan/recommended-plan.html',
        controller: 'RecommendedPlanController'
    });
