angular.module('uitoolkit')
    .component('recommendationsTabsCarousel', {
        restrict: 'E',
        bindings: {
            messagePosition: '@',
            url: '@',
            monthlyCostLabel: '@',
            upfrontCostLabel: '@',
            freeLabel: '@',
            benefitIcon: '@',
            talkLabel: '@',
            textLabel: '@',
            sellTextUpsell1: '@',
            sellTextUpsell2: '@',
            sellTextUpsellOther: '@',
            sellTextDownsell: '@',
            sellTextBestMatch: '@',
            labelData: '@',
            pointsData: '@',
            pointsDataColor: '@',
            textPoints: '@',
            talkPoints: '@',
            textPointsColor: '@',
            talkPointsColor: '@',
            unlimitedText: '@',
            noResultsMsg: '@',
            noResultsTitle: '@',
            noResultsButtonPath: '@',
            noResultsButtonLabel: '@',
            enableTabs: '<',
            enableCarousel: '<'
        },
        templateUrl: '/components/ng-components/recommendations-tabs-carousel/recommendations-tabs-carousel.html',
        controller: 'RecommendationsTabsCarouselController'

    })
