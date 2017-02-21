/**
 * @example
 * <graph-small
 *     canvas-color="{{textPointsColor}}"
 *     canvas-id="allowance-canvas{{$index}}"
 *     canvas-position="{{rtc.getAllowanceGraphPosition(item.tariff.textAllowance.number, item.tariff.textAllowance.units, item.tariff.textAllowance.unlimited, textPoints)}}"
 * ></graph-small>
 */

angular
    .module('uitoolkit')
    .component('graphSmall', {
        bindings: {
            canvasColor: '@',
            canvasId: '@',
            canvasPosition: '@'
        },
        templateUrl: '/components/ng-components/graph-small/graph-small.html'
    });
