/**
 * @example
 * <graph
 *     canvas-color="{{textPointsColor}}"
 *     canvas-id="allowance-canvas{{$index}}"
 *     canvas-position="{{rtc.getAllowanceGraphPosition(item.tariff.textAllowance.number, item.tariff.textAllowance.units, item.tariff.textAllowance.unlimited, textPoints)}}"
 *     canvas-size="S" //['S'|'']
 * ></graph>
 */

angular
    .module('uitoolkit')
    .component('graph', {
        bindings: {
            canvasColor: '@',
            canvasId: '@',
            canvasPosition: '@',
            canvasSize: '@'
        },
        controller: 'GraphController',
        templateUrl: '/components/ng-components/graph/graph.html'
    });
