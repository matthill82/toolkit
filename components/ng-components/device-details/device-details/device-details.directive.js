/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .directive('deviceDetails', function () {

        return {
            replace: true,
            scope: true,
            link: function (scope, element, attr) {

                scope.buyLink = attr.ddBuylink;
                scope.buyLabel = attr.ddBuylabel;
                scope.actionMode = attr.ddActionMode;
                scope.colourSizeMsg = attr.ddColoursizemsg;
                scope.colourSizeOneOptionMsg = attr.ddColoursizeoneoptionmsg;
                scope.colourSizeOneCapacityMsg = attr.ddColoursizeonecapacitymsg;
                scope.colourSizeOneColourMsg = attr.ddColoursizeonecolourmsg;
                scope.phoneLabel = attr.ddPhonelabel;
                scope.buyMsg = attr.ddBuymsg;
                scope.readMoreLabel = attr.ddReadmorelabel;
                scope.readLessLabel = attr.ddReadlesslabel;
                scope.readNumberLines = attr.ddReadNumberLinesConfig;
                scope.fwdButtonIcon = attr.ddFwdButtonIcon;
                scope.fwdButtonXOffset = attr.ddFwdButtonXOffset;
                scope.fwdButtonSize = attr.ddFwdButtonSize;
                scope.fwdButtonLabel = attr.ddFwdButtonLabel;

                scope.fwdButtonXOffsetStyle = 'top:' + scope.fwdButtonXOffset + 'px';
                scope.fwdButtonIconSizeStyle = 'font-size:' + scope.fwdButtonSize + 'px';
            },
            templateUrl: function (elem, attrs) {

               var isEmpty = String.prototype.isEmpty = function(str) {
                    return (!str || 0 === str.length);
                };

                var defaultPath = '/components/ng-components/device-details/device-details/',
                    deviceDetailsString = 'device-details-';

                if (isEmpty(attrs.ddTemplateUrl)) {
                    return defaultPath + 'device-details.html'
                } else {
                    return defaultPath + deviceDetailsString + attrs.ddTemplateUrl + '.html';
                }
            }
        }

    });
