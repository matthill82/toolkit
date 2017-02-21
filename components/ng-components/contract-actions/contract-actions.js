/**
 * @example
 *  <contract-actions></contract-actions>
 */

angular.module('uitoolkit')
    .component('contractActions', {
        bindings: {
            contractType: '<'
        },
        templateUrl: '/components/ng-components/contract-actions/contract-actions.html'
    });
