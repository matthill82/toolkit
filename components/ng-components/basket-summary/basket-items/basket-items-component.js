/**
 * @example
 *  <basket-items
 *  ></basket-items>
 */
angular
    .module('uitoolkit')
    .component('basketItems', {
        bindings: {
            items: '<',
            icon: '@',
            payTotalTitle: '@',
            feesLabel: '@',
            feesDropLabel1: '@',
            feesDropLabel2: '@'
        },
        templateUrl: '/components/ng-components/basket-summary/basket-items/basket-items.html'
    });
