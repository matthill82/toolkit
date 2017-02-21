angular.module('uitoolkit')
    .component('hrSeparator', {
        bindings: {
            width: '@hrWidth',
            height: '@hrHeight'
        },
        controller: 'HrSeparatorController',
        controllerAs: 'HrSeparatorController',
        templateUrl: '/components/ng-components/hr-separator/hr-separator.html'
    });

