/**
 * @example
 *  <basket-total
 *      bt-savings-text="Savings"
 *      bt-total-text="Total"
 *  ></basket-total>
 */
angular.module('uitoolkit')
    .component('basketTotal', {
        bindings: {
            savingsText: '@btSavingsText',
            totalText: '@btTotalText'
        },
        controller: function BasketSummaryController(BasketService) {
            var $ctrl = this;

            $ctrl.$onInit = BasketSummaryController$onInit;

            function BasketSummaryController$onInit() {
                $ctrl.basket = BasketService.getBasket();
            }
        },
        templateUrl: '/components/ng-components/basket-total/basket-total.html'
    });
