/**
 * @example
 *  <account-summary
 *      summary="{object}"
 *  ></account-summary>
 */
angular.module('uitoolkit')
    .component('accountSummary', {
        bindings: {
            account: '<'
        },
        controller: function () {},
        templateUrl: '/components/ng-components/customer-visualisation/account-summary/account-summary.html'
    });
