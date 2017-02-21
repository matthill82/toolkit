angular.module('uitoolkit')
    .directive('plansRecommendations', function ($state) {

        return {

            templateUrl: '/components/ng-components/plans-recommendations/plans-recommendations.html',
            controller: 'PlansRecommendationsController',
            controllerAs: 'PlansRecommendationsController',
            link: function (scope, element, attr) {
                scope.url = attr.prUrl;
                scope.monthCostLabel = attr.prMonthlyCostLabel;
                scope.upfrontCostLabel = attr.prUpfrontCostLabel;
                scope.freeLabel = attr.prFreeLabel;
                scope.benefitIcon = attr.prBenefitIcon;
                scope.dataLabel = attr.prDataLabel;
                scope.talkLabel = attr.prTalkLabel;
                scope.textLabel = attr.prTextLabel;
                scope.sellTextUpsell1Text = attr.prSelltextUpsell1;
                scope.sellTextUpsell2Text = attr.prSelltextUpsell2;
                scope.sellTextDownsellText = attr.prSelltextDownsell;
                scope.sellTextBestMatchText = attr.prSelltextBestmatch;
                scope.dataPoints = attr.prDataPoints;
                scope.textPoints = attr.prTextPoints;
                scope.talkPoints = attr.prTalkPoints;
                scope.dataPointsColor = attr.prDataPointsColor;
                scope.textPointsColor = attr.prTextPointsColor;
                scope.talkPointsColor = attr.prTalkPointsColor;
                scope.unlimitedText = attr.prUnlimitedText;
                scope.noResultsMsg = attr.prNoResultsMsg;
                scope.noResultsTitle = attr.prNoResultsTitle;
                scope.noResultsButtonPath = attr.prNoResultsButtonPath;
                scope.noResultsButtonLabel = attr.prNoResultsButtonLabel;
                scope.dataUrl = attr.prDataUrl;
                scope.sellText = [scope.sellTextDownsellText, scope.sellTextBestMatchText, scope.sellTextUpsell1Text, scope.sellTextUpsell2Text];

                scope.goToNoResultsButtonPath = function () {
                    var link = scope.noResultsButtonPath;

                    link = link.replaceHTMLSuffix();
                    $state.go(link);
                };
            }
        };

    });
