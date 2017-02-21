angular.module('uitoolkit')
        .directive('deviceImages', function () {

                return {
                    replace: true,
                    priority: 1,
                    scope: true,
                    templateUrl: '/components/ng-components/device-details/device-images/device-images.html',
                    link: function (scope, element, attr) {
                        scope.closeicon = attr.deviceImageCloseIcon;


                    }
                }
            });
