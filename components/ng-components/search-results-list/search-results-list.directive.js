/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
        .directive('searchResultsList', function () {
            return {
                scope: true,
                replace: true,
                controller: 'SearchResultsListController',
                templateUrl: '/components/ng-components/search-results-list/search-results-list.html',
                link: function (scope, element, attr) {
                    scope.slidesToShow = attr.drcSlidesToShow;
                    scope.slidesToScroll = attr.drcSlidesToScroll;
                    scope.isCompare = attr.drcIsCompare;
                    scope.deviceSwatchText = attr.drcDeviceSwatchText;
                    scope.buttonLeftIcon = attr.drcButtonLeftIcon;
                    scope.buttonRightIcon = attr.drcButtonRightIcon;
                    scope.viewDetailsText = attr.drcViewDetailsText;
                    scope.redirectUrl = attr.drcRedirectUrl;
                    scope.addToCompareActive = attr.drcAddToCompareActive;
                    scope.addToCompareInactive = attr.drcAddToCompareInactive;
                    scope.removeCompareIcon = attr.drcRemoveCompareIcon;
                    scope.noResultsMsg = attr.drcNoResultsMsg;
                    scope.compareTitle = attr.drcCompareTitle;
                    scope.compareResultsPath = attr.drcCompareResultsPath;
                    scope.compareResultsPathLabel = attr.drcCompareResultsPathLabel;

                    scope.deviceCategory = attr.drcDeviceCategory;
                    scope.planType = attr.drcPlanType;
                    scope.useQuestions = attr.drcUseQuestions;


                    scope.initOnload = false;


                },
            }
        });
