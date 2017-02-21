angular.module('uitoolkit')
    .directive('fasttrackContainer', function () {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/fasttrack-container/fasttrack-container.html',
            link: function (scope, element, attr) {
                var ftItemsJson = attr.ftcItems;
                var modJson = '"' + ftItemsJson.replace(/([^\\]|^)\\x/g, '$1\\u00') + '"';
                var decodedString = $.parseJSON(modJson);

                scope.mainTitle = attr.ftcTitle;
                decodedString = $.parseJSON(decodedString);
                scope.itemjson = decodedString[0];
            }
        };
    });
