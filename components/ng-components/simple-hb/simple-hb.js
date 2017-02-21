/**
 * @example
 *  <simple-hb
 *      service=""
 *      template-mapping=""
 *  ></simple-hb>
 */
angular
    .module('uitoolkit')
    .component('simpleHb', {
        bindings: {
            doneRedirectPath: '@',
            doneUrl: '@',
            service: '@',
            templateMapping: '@'
        },
        controller: 'SimpleHbController',
        templateUrl: '/components/ng-components/simple-hb/simple-hb.html'
    });
