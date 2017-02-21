angular.module('uitoolkit')
    .directive('propositionsList',function() {

        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/propositions-list/propositions-list.html',
            link: function(scope, element, attr){
                scope.ctaPath = attr.propCtaPath;
                scope.currencyConfig = attr.propCurrencyConfig;
                scope.$parent.planType = attr.propPlanType;

                scope.noResultsTitle = attr.propNoResultsTitle;
                scope.noResultsMessage = attr.propNoResultsMessage;

                scope.pageSize = attr.propPageSize;
                scope.pagination.pageSize = scope.pageSize;

                var featuresList = attr.propFeatures || '';
                if (featuresList) {
                    scope.displayedFeatures = angular.fromJson(featuresList.replace(/[\\]+x22/g, '"'));
                }
            }
        }
});
