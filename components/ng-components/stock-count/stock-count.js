/**
 * @example
 *  <stock-count
 *      method
 *  ></stock-count>
 */
angular
    .module('uitoolkit')
    .component('stockCount', {
        bindings: {
            method: '@'
        },
        controller: 'StockCountController',
        templateUrl: '/components/ng-components/stock-count/stock-count.html'
    });
