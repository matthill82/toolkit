angular.module('uitoolkit')
    .component('deviceProductcode', {
        bindings: {
            pctext: '@pcText'
        },
        controller: function ($scope, EventEnums) {
            var $ctrl = this;

            $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
                $ctrl.device = data;
            });
        },
        templateUrl: '/components/ng-components/device-details/device-productcode/device-productcode.html'
    });
