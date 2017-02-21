angular.module('uitoolkit')
    .directive('deviceSpecs',function() {
 
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/device-details/device-specs/device-specs.html',           
            link: function(scope, element, attr){              
                scope.specTitle = attr.dsMainTitle;    
                
                scope.columnBreak = 2; //Max number of colunms
                scope.startNewRow = function (index, count) {
                    return ((index) % count) === 0;
                };
            }
        }
});
