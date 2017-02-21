angular.module('uitoolkit')
    .directive('verticalSlider', function () {
        return {
            replace: true,
            restrict: 'AEC',
            scope: {
                bracket: '@vsBracket',
                imgCTA: '@vsImgCta',
                selectCTA: '@vsSelectCta'
            },
            controller: 'VerticalSliderController',
            templateUrl: '/components/ng-components/vertical-slider/vertical-slider.html',
            link: function (scope, element, attr) {
                scope.primaryColor = attr.vsPrimaryColor;
                scope.backgroundColor = attr.vsBackgroundColor;
                scope.headerTitle = attr.vsHeaderTitle;
                scope.ctaColor = attr.vsCtaColor;
                scope.direction = attr.vsDirection;
                scope.vsDevices = attr.vsDevicesLoadingFuncName;
                scope.buttonText = attr.vsButtonText;

                scope.limit = attr.vsLimit;
                scope.bracket = attr.vsBracket;

                scope.currencyRules = attr.vsCurrencyRules;
                scope.journeyType = attr.vsJourneyType;

                scope.layoutType = attr.vsLayoutType;

                scope.stockText = attr.stockText;
                scope.stockExtraSign = attr.stockExtraSign;
                scope.stockUnavailableText = attr.stockUnavailableText;
                scope.stockThreshold = attr.stockThreshold;


                scope.featureFeatureList = attr.featureFeatureList;
                scope.featureDisplay = attr.featureDisplay;

                scope.cta = attr.vsSelectCta;

                scope.devices = [];
            }
        };
    });
