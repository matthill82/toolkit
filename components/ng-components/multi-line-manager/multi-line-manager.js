angular.module('uitoolkit')
    .component('multiLineManager', {
        bindings: {
            displayMode: '@',
            maxNumberGroups: '@',
            grouping: '@',
            customersData: '@',

            deviceEmptyImage: '@',
            deviceEmptyText: '@',

            leftButtonIcon: '@',
            leftButtonText: '@',

            paymentOptionsLabel: '@',
            paymentOptionsIcon: '@',
            paymentOptionsRedirectUrl: '@',

            removeButtonIcon: '@',
            removeDialogTitle: '@',
            removeDialogText: '@',
            removeDialogOk: '@',
            removeDialogCancel: '@',

            rightButtonIcon: '@',
            rightButtonText: '@'
        },
        controller: 'MultiLineManagerController',
        templateUrl: '/components/ng-components/multi-line-manager/multi-line-manager.html'
    });
