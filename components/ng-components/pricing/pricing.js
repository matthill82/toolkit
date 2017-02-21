angular
    .module('uitoolkit')
    .component('pricing', {
        // Optionally you may bind the device and offering rather than
        // using the event based usage pattern if it makes sense to do so.
        bindings: {
            currencyConfig: '@prCurrencyConfig',
            device: '=?prDevice',
            layoutType: '@prLayoutType',
            offering: '=?prOffering'
        },
        controller: 'PricingController',
        templateUrl: '/components/ng-components/pricing/pricing.html'
    });
