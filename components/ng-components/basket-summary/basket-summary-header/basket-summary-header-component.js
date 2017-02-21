/**
 * @example
 *  <basket-summary-header
 *      bs-header="Type={String}"
 *  ></basket-summary-header>
 */
angular
    .module('uitoolkit')
    .component('basketSummaryHeader', {
        bindings: {
            headerTitle: '<',
            hasPadding: '@'
        },
        templateUrl: '/components/ng-components/basket-summary/basket-summary-header/basket-summary-header.html'
    });
