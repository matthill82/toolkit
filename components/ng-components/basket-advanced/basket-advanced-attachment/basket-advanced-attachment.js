// This is a child component and as such should not be built into AEM
angular.module('uitoolkit')
    .component('basketAdvancedAttachment', {
        bindings: {
            codeText: '@',
            basketItem: '<',
            monthlyPaymentText: '@',
            remove: '&',
            removeIcon: '@'
        },
        templateUrl: '/components/ng-components/basket-advanced/basket-advanced-attachment/basket-advanced-attachment.html'
    });
