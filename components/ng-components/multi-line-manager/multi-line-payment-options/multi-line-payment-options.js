angular.module('uitoolkit')
    .component('multiLinePaymentOptions', {
        bindings: {
            customerId: '@',
            offerings: '<',
            selectedOffering: '@',
            onSelect: '&?'
        },
        templateUrl: '/components/ng-components/multi-line-manager/multi-line-payment-options/multi-line-payment-options.html'
    });
