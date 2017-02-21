angular.module('uitoolkit')
    .directive('deviceFeatures',function() {
 
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/device-details/device-features/device-features.html',           
            link: function(scope, element, attr){              
                scope.featuresTitle = attr.dfMainTitle;
            }
        }
});
