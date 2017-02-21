/**
 * @example
 *  <uit-number-format
 *      decimal-places="2"
 *      decimal-separator="."
 *      group-separator=","
 *      number="1000.10"
 *  ></uit-number-format>
 */
angular
    .module('uitoolkit')
    .component('uitNumberFormat', {
        bindings: {
            decimalPlaces: '@',
            decimalSeparator: '@',
            groupSeparator: '@',
            number: '<'
        },
        templateUrl: '/components/uit-components/number-format/number-format.html'
    });
