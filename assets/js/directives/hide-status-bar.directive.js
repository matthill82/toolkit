angular
    .module('uitoolkit')
    .directive('hideStatusBar', hideStatusBarDirective);

function hideStatusBarDirective($window) {
    return {
        restrict: 'A',
        compile: function hideStatusBarCompile() {
            return function addEventHandler(scope, element) {
                element.on('blur', function () {
                    scope.$evalAsync(function () {
                        if (angular.isDefined($window.Immersify)) {
                            $window.Immersify.enableSticky(angular.noop, angular.noop);
                        }
                    });
                });
            };
        }
    };
}
