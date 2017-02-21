angular
    .module('uitoolkit')
    .component('stockToggle', {
        bindings: {
            allStoreText: '@stAllStoreText',
            inStoreText: '@stInStoreText'
        },
        controller: 'StockToggleController',
        templateUrl: '/components/ng-components/stock-toggle/stock-toggle.html'
    });
