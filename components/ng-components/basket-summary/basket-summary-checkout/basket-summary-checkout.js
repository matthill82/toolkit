/**
 * @example
 *  <basket-summary-checkout
 *      button-text="Type={String}"
 *      button-path="Type={String}"
 *      has-padding="true || false"
 *  ></basket-summary-checkout>
 */
angular
    .module('uitoolkit')
    .component('basketSummaryCheckout', {
        bindings: {
            buttonText: '<',
            buttonPath: '@',
            hasPadding: '@'
        },
        templateUrl: '/components/ng-components/basket-summary/basket-summary-checkout/basket-summary-checkout.html'
    });

