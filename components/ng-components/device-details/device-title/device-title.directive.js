/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .directive('deviceTitle', function () {

        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/device-details/device-title/device-title.html',
            link: function (scope, element, attr) {
                scope.nameSymbolCutoff = attr.dtNameSymbolCutoff;
                scope.nameMaxLength = attr.dtNameSymbolCutoffLength;
            }
        }

    });
