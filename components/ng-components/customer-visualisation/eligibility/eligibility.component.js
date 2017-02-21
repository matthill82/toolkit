/**
 * @example
 *  <eligibility
 *      data="{object}"
 *  ></eligibility>
 */
angular.module('uitoolkit')
    .component('eligibility', {
        bindings: {
            eligibility : '<'
        },
        controller: function () {},
        templateUrl: '/components/ng-components/customer-visualisation/eligibility/eligibility.html'
    });
