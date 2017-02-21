/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .directive('deviceResults', function () {
        return {
            scope: true,
            replace: true,
            templateUrl: '/components/ng-components/device-carousel/device-results/device-results.html',
            link: function (scope, element, attr) {
                scope.hideColorOptions = attr.drHideColorOptions  === 'true';
                scope.ctaText = attr.drCtaText;
                scope.availableColoursText = attr.drAvailableColoursText;
                scope.deviceLink = attr.drDeviceLink;
                scope.compareIcon = attr.drCompareIcon;
                scope.compareActive = attr.drCompareActive;
                scope.isCompare = attr.drIsCompare;
                scope.removeFromCompareIcon = attr.drRemoveFromCompareIcon;  
                scope.filterDevices = attr.drFilterDevices;
                scope.filterFeatures = attr.drFilterFeatures;
                scope.navigate = function (device) {
                    device=null;//jshinthack
                };

            }
        }
    });
