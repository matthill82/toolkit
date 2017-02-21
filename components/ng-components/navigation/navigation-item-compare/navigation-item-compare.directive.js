angular.module('uitoolkit')
    .directive('navigationItemCompare', function () {
        return {
            replace: true,
            scope: {
                'data': '='
            },
            controller: 'NavigationItemCompareController',
            controllerAs: 'NavigationItemCompareController',
            templateUrl: '/components/ng-components/navigation/navigation-item-compare/navigation-item-compare.html',
            link: function (scope, element, attr) {
                scope.linkComparePath = attr.nicPath;
                scope.linkCompareLabel = attr.nicLabel;
            }

        }
    });
