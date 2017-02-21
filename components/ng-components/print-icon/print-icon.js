/**
 * @example
 *  <print-icon
 pi-print-icon=""
 pi-include-print=""
 *  >
 *  </print-icon>
 */
angular.module('uitoolkit')
    .component('printIcon', {
        bindings: {
            icon: '<cpIcon'
        },
        templateUrl: '/components/ng-components/print-icon/print-icon.html'
    });
