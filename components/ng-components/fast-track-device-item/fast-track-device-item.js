angular
    .module('uitoolkit')
    .component('fastTrackDeviceItem',{
        bindings: {
            currencyConfig: '@',
            deviceId: '@',
            message: '@',
            path: '@',
            price: '@',
            pricePrefix: '@'
        },
        controller: 'FastTrackDeviceItemController',
        require: {
            FastTrackDeviceContainerController: '^fastTrackDeviceContainer'
        },
        templateUrl: '/components/ng-components/fast-track-device-item/fast-track-device-item.html'
    });
