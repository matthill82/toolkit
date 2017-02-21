/**
 * @example
 *  <left-action
       la-path=""
       la-text=""
       la-icon=""
 *  >
 *  </left-action>
 */
angular.module('uitoolkit')
    .component('leftAction', {
        bindings: {
            icon: '<laIcon',
            path: '<laPath',
            text: '<laText'
        },
        templateUrl: '/components/ng-components/left-action/left-action.html'
    });
