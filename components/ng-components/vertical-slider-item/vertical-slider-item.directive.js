angular.module('uitoolkit')
    .directive('verticalSliderItem', function () {
        return {
            controller: 'VerticalSliderItemController',
            templateUrl: '/components/ng-components/vertical-slider-item/vertical-slider-item.html',
            link: function (scope, element, attr) {
                scope.product = angular.fromJson(attr.vsiProduct);
                scope.broadcastProduct(scope.product);
            }
        };
    });
