angular.module('uitoolkit')
    .component('deviceRecommendations', {
        bindings: {
            selectCta: '@drSelectCta',
            imgCta: '@drImgCta',
            currencyRules: '@drCurrencyRules',
            journeyType: '@drJourneyType',
            journeyBackPaths: '@drJourneyBackPaths',
            cutOff: '@drCutOff',
            buttonText: '@drButtonText',

            //compare
            compareInactiveIcon: '@compareInactiveIcon',
            compareActiveIcon: '@compareActiveIcon',
            compareHidden: '@compareHidden',

            //feature icons
            featureFeatureList: '@featureFeatureList',
            featureDisplay: '@featureDisplay',

            //loading animation
            loadingDelay: '@',
            loadingText: '@',
            animationPath:'@loadingAnimationPath',
            animationEnabledString:'@loadingAninmationEnabled',

            //upsell
            upsellFeatureCategory: '@'

        },
        controller: 'DeviceRecommendationsController',
        templateUrl: '/components/ng-components/device-recommendations/device-recommendations.html'
    });
