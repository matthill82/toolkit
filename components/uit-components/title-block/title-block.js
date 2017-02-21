/**
 * @example
 * <uit-title-block
 *      title="">
 *     </uit-title-block>
 */
angular.module('uitoolkit')
    .component('uitTitleBlock', {
        templateUrl: '/components/uit-components/title-block/title-block.html',
        bindings: {
            title: '@'
        }
    });
