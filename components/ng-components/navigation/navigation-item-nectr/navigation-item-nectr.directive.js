angular.module('uitoolkit')
    .directive('navigationItemNectr', function () {

        return {
            replace: true,
            scope: {
                'data': '='
            },
            templateUrl: '/components/ng-components/navigation/navigation-item-nectr/navigation-item-nectr.html',
                    link: function (scope, element, attr) {
                        scope.nectrTitle = attr.ninLabel;                                              
                    }
        }
    })
;
