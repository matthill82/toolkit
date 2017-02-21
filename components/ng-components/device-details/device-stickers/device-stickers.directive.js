/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

/**
 * @desc stickers directive that can be used anywhere across the app
 * @example <device-stickers ds-data-url="" ds-order="">
 */
angular.module('uitoolkit')
    .directive('deviceStickers', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/device-details/device-stickers/device-stickers.html',
            controller : 'DeviceStickersController as ds',
            bindToController: true,
            link: function ($scope, element, attr) {
                $scope.journeyType = attr.dsJourneyType;
            }
        };
    });
