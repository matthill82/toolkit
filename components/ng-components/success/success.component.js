angular.module('uitoolkit')
    .component('success', {
        bindings: {
            imageUrl: '@sImageUrl',
            imageAlt: '@sImageAlt',
            successText: '@sSuccessText'
        },
        controller: 'SuccessController',
        templateUrl: '/components/ng-components/success/success.html'
    });
