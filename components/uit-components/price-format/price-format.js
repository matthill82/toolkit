/**
 * See global priceFormat config for additional options.
 *
 * @example
 *  <uit-price-format
 *      number="3000"
 *  ></uit-price-format>
 */
angular
    .module('uitoolkit')
    .component('uitPriceFormat', {
        bindings: {
            number: '<'
        },
        controller: 'UitPriceFormatController',
        templateUrl: '/components/uit-components/price-format/price-format.html'
    });
