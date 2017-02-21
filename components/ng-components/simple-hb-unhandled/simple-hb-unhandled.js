/**
 * @example
 *  <simple-hb-unhandled></simple-hb-unhandled>
 */
angular
    .module('uitoolkit')
    .component('simpleHbUnhandled', {
        controller: 'SimpleHbUnhandledController',
        template: '<div hb-unhandled="$ctrl.getUnhandled()"></div>'
    });
