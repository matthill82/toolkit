/**
 * @example
 * <uit-icon-list
 *      title="">
 *     </uit-icon-list>
 */
angular.module('uitoolkit')
    .component('uitIconList', {
        templateUrl: '/components/uit-components/icon-list/icon-list.html',
        bindings: {
            list: '<'
        }
    });
