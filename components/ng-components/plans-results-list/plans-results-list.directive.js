angular.module('uitoolkit')
    .directive('plansResultsList',function () {

        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/plans-results-list/plans-results-list.html',
            link: function (scope, element, attr){
                scope.mainTitle = attr.bTitle;
                scope.ctaLabel = attr.bCtaLabel;
                scope.ctaPath = attr.bCtaPath;
                scope.payTodayLabel = attr.bPayTodayLabel;
                scope.perMonthLabel = attr.bPerMonthLabel;
                scope.upfrontCostLabel = attr.bUpfrontCostLabel;
                scope.textLabel = attr.bTextLabel;
                scope.talkLabel = attr.bTalkLabel;
                scope.dataLabel = attr.bDataLabel;
                scope.contractLabel = attr.bContractLabel;
                scope.contractLengthLabel = attr.bContractLengthLabel;
                scope.bandwidthLabel = attr.bBandwidthLabel;
                scope.dataPointsColor = attr.bDataPointsColor;
                scope.textPointsColor = attr.bTextPointsColor;
                scope.talkPointsColor = attr.bTalkPointsColor;
                scope.dataPoints = attr.bDataPoints;
                scope.textPoints = attr.bTextPoints;
                scope.talkPoints = attr.bTalkPoints;
                scope.unlimitedText = attr.bUnlimitedText;
                scope.contractIcon = attr.bContractIcon;
                scope.generationIcon = attr.bGenerationIcon;
                scope.currencyConfig = attr.bCurrencyConfig;
                scope.planCtaEnabled = attr.bPlanCtaEnabled === 'true';
                scope.planCtaPath = attr.bPlanCtaPath;

                scope.$parent.planType = attr.prlPlanType;

                scope.noResultsTitle = attr.prlNoResultsTitle;
                scope.noResultsMessage = attr.prlNoResultsMessage;
                scope.pageSize = attr.prlPageSize;
                scope.pagination.pageSize = scope.pageSize;

                scope.displayTile = attr.prlDisplayTile === 'yes';
                scope.displayTitle = attr.prlDisplayTitle === 'yes';
                scope.displayColors = attr.prlDisplayColors === 'yes';
                scope.displayedDetails = attr.prlDisplayedDetails || 'plan'; // ["device"|"plan"]
                var featuresList = attr.prlDisplayedFeatures || '';
                if (featuresList){
                    scope.displayedFeatures = angular.fromJson(featuresList.replace(/[\\]+x22/g, '"'));
                }
            }
        };
});
