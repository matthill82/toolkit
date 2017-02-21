/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .directive('deviceImage', function () {

        return {
            scope: true,
            bindToController: {
                size: '@diSize'
            },
            controller: 'DeviceImageController',
            controllerAs: '$ctrl',
            templateUrl: '/components/ng-components/device-details/device-image/device-image.html',
            link: function (scope, element, attr) {
                scope.compareActive = attr.diCompareActive;
                scope.compareInactive = attr.diCompareInactive;
                scope.compareIsHidden = attr.diCompareIsHidden;
            }
        };

    });
