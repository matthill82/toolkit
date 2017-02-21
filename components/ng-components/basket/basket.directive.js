angular
    .module('uitoolkit')
    .directive('basket', basketDirective);

function basketDirective() {
    return {
        replace: true,
        scope: true,
        templateUrl: '/components/ng-components/basket/basket.html',
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
            scope.colourLabel = attr.bColourLabel;
            scope.capacityLabel = attr.bCapacityLabel;
            scope.quantityLabel = attr.bQuantityLabel;
            scope.dataPointsColor = attr.bDataPointsColor;
            scope.textPointsColor = attr.bTextPointsColor;
            scope.talkPointsColor = attr.bTalkPointsColor;
            scope.dataPoints = attr.bDataPoints;
            scope.textPoints = attr.bTextPoints;
            scope.talkPoints = attr.bTalkPoints;
            scope.unlimitedText = attr.bUnlimitedText;
            scope.contractIcon = attr.bContractIcon;
            scope.generationIcon = attr.bGenerationIcon;
            scope.displayedDetails = attr.bDisplayedDetails;
        }
    };
}
