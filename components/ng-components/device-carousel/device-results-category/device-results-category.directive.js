/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
        .directive('deviceResultsCategory', function () {

                return {
                    replace: true,
                    scope: true,
                    templateUrl: '/components/ng-components/device-carousel/device-results-category/device-results-category.html',
                    link: function (scope, element, attr) {

                        scope.icon = attr.drcCategoryIcon;
                        scope.categoryName = attr.drcCategoryName;
                        scope.categoryItems = attr.drcCategoryItems;
                        scope.isCompare = attr.drcIsCompare;
                        var sameHeightHookGroup = attr.drcSameHeightHook;

                        if (scope.isCompare === 'true') {
                            scope.sameHeightHook = 'compare-' + sameHeightHookGroup;
                        } else {
                            scope.sameHeightHook = 'results-' + sameHeightHookGroup;
                        }
                    }
                };

            })
        ;
